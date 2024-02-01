import { Router } from 'express';
import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import {Strategy as SteamStrategy} from 'passport-steam';
import { PassportStrategy } from '../../core/passport/Strategy';
import { STEAM_STORE_STRATEGY_NAME, SteamAuthOptions, Profile } from './types';
import { passportAuthRoutesBuilder } from '../../core/passport/utils/auth-routes-builder';
import { validateStoreCallback } from '../../core/validate-callback';
import { AuthOptions, StrategyFactory } from '../../types';

export function getSteamStoreStrategy(id: string): StrategyFactory<SteamAuthOptions> {
    const strategyName = `${STEAM_STORE_STRATEGY_NAME}_${id}`;

    return class extends PassportStrategy(SteamStrategy, strategyName){
        constructor(
            protected readonly container: MedusaContainer,
            protected readonly configModule: ConfigModule,
            protected readonly strategyOptions: SteamAuthOptions,
            protected readonly strict?: AuthOptions['strict']
        ) {
            super({
                returnURL: strategyOptions.store.callbackUrl,
                realm: strategyOptions.realm,
                apiKey: strategyOptions.apiKey,
                passReqToCallback: true,
            });
        }
    
        async validate(
            req: Request,
            identifier: string,
            profile: Profile,
        ): Promise<null | { id: string }> {
            if (this.strategyOptions.store.verifyCallback) {
                return await this.strategyOptions.store.verifyCallback(
                    this.container,
                    req,
                    identifier,
                    profile,
                    this.strict
                );
            }
    
            return await validateStoreCallback(profile, {
                container: this.container,
                strategyErrorIdentifier: 'steam',
                strict: this.strict,
                strategyName
            });
        }
    }
}

/**
 * Return the router that hold the steam store authentication routes
 * @param steam
 * @param configModule
 */
export function getSteamStoreAuthRouter(id: string, steam: SteamAuthOptions, configModule: ConfigModule): Router {
	const strategyName = `${STEAM_STORE_STRATEGY_NAME}_${id}`;
	
    return passportAuthRoutesBuilder({
		domain: 'store',
		configModule,
		authPath: steam.store.authPath ?? '/store/auth/steam',
		authCallbackPath: steam.store.authCallbackPath ?? '/store/auth/steam/cb',
		successRedirect: steam.store.successRedirect,
		strategyName,
		passportAuthenticateMiddlewareOptions: {},
		passportCallbackAuthenticateMiddlewareOptions: {
			failureRedirect: steam.store.failureRedirect,
		},
		expiresIn: steam.store.expiresIn,
	});
}