import { AuthOptions, StrategyExport } from '../../types';
import { Router } from 'express';
import { getSteamAdminAuthRouter, getSteamAdminStrategy } from './admin';
import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { getSteamStoreAuthRouter, getSteamStoreStrategy } from './store';
import { SteamAuthOptions } from './types';

export * from './types';
export * from './admin';
export * from './store';

export default {
	load: (container, configModule, options): void => {
		const id = options.identifier ?? options.type;
		if (options.admin) {
			const Clazz = getSteamAdminStrategy(id);
			new Clazz(container, configModule, options, options.strict);
		}

		if (options.store) {
			const Clazz = getSteamStoreStrategy(id);
			new Clazz(container, configModule, options, options.strict);
		}
	},
	getRouter: (configModule, options): Router[] => {
		const id = options.identifier ?? options.type;
		const routers = [];

		if (options.admin) {
			routers.push(getSteamAdminAuthRouter(id, options, configModule));
		}

		if (options.store) {
			routers.push(getSteamStoreAuthRouter(id, options, configModule));
		}

		return routers;
	},
} as StrategyExport<SteamAuthOptions>;