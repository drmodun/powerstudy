/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/` | `/(drawer)/(tabs)` | `/(drawer)/(tabs)/` | `/(drawer)/(tabs)/explore` | `/(drawer)/(tabs)/scan` | `/(drawer)/explore` | `/(drawer)/scan` | `/(drawer)/user` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/scan` | `/_sitemap` | `/explore` | `/login` | `/scan` | `/signup` | `/user`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
