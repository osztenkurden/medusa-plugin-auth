import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { FirebaseAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getFirebaseStoreStrategy(id: string): StrategyFactory<FirebaseAuthOptions>;
/**
 * Return the router that hold the firebase store authentication routes
 * @param id
 * @param firebase
 * @param configModule
 */
export declare function getFirebaseStoreAuthRouter(id: string, firebase: FirebaseAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=store.d.ts.map