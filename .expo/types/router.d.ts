/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/` | `/(drawer)/(tabs)` | `/(drawer)/(tabs)/` | `/(drawer)/(tabs)/explore` | `/(drawer)/(tabs)/photoAi` | `/(drawer)/(tabs)/scan` | `/(drawer)/explore` | `/(drawer)/photoAi` | `/(drawer)/scan` | `/(drawer)/user` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/photoAi` | `/(tabs)/scan` | `/_sitemap` | `/explore` | `/login` | `/photoAi` | `/scan` | `/signup` | `/user`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
