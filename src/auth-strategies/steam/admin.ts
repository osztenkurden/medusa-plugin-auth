import { Strategy as SteamStrategy } from 'passport-steam';
import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { Profile, STEAM_ADMIN_STRATEGY_NAME, SteamAuthOptions } from './types';
import { PassportStrategy } from '../../core/passport/Strategy';
import { validateAdminCallback } from '../../core/validate-callback';
import { passportAuthRoutesBuilder } from '../../core/passport/utils/auth-routes-builder';
import { AuthOptions, StrategyFactory } from '../../types';

export function getSteamAdminStrategy(id: string): StrategyFactory<SteamAuthOptions> {
	const strategyName = `${STEAM_ADMIN_STRATEGY_NAME}_${id}`;

    return class extends PassportStrategy(SteamStrategy, strategyName) {

        constructor(
            protected readonly container: MedusaContainer,
            protected readonly configModule: ConfigModule,
            protected readonly strategyOptions: SteamAuthOptions,
            protected readonly strict?: AuthOptions['strict'],
        ) {
            super({
                returnURL: strategyOptions.admin.callbackUrl,
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
            if (this.strategyOptions.admin.verifyCallback) {
                return await this.strategyOptions.admin.verifyCallback(
                    this.container,
                    req,
                    identifier,
                    profile,
                    this.strict,
                );
            }
    
            return await validateAdminCallback({...profile, emails: [{ value: '' }]}, {
                container: this.container,
                strategyErrorIdentifier: 'steam',
                strict: this.strict,
                strategyName
            });
        }
    }
}

/**
 * Return the router that hold the steam admin authentication routes
 * @param steam
 * @param configModule
 */
export function getSteamAdminAuthRouter(id: string, steam: SteamAuthOptions, configModule: ConfigModule): Router {
    const strategyName = `${STEAM_ADMIN_STRATEGY_NAME}_${id}`;
	return passportAuthRoutesBuilder({
		domain: 'admin',
		configModule,
		authPath: steam.admin.authPath ?? '/admin/auth/steam',
		authCallbackPath: steam.admin.authCallbackPath ?? '/admin/auth/steam/cb',
		successRedirect: steam.admin.successRedirect,
		strategyName,
		passportAuthenticateMiddlewareOptions: {},
		passportCallbackAuthenticateMiddlewareOptions: {
			failureRedirect: steam.admin.failureRedirect,
		},
		expiresIn: steam.admin.expiresIn,
	});
}