import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { FirebaseAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getFirebaseAdminStrategy(id: string): StrategyFactory<FirebaseAuthOptions>;
/**
 * Return the router that hold the firebase admin authentication routes
 * @param id
 * @param firebase
 * @param configModule
 */
export declare function getFirebaseAdminAuthRouter(id: string, firebase: FirebaseAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=admin.d.ts.map