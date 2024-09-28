/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/` | `/(drawer)/(tabs)` | `/(drawer)/(tabs)/` | `/(drawer)/(tabs)/explore` | `/(drawer)/(tabs)/login` | `/(drawer)/(tabs)/scan` | `/(drawer)/(tabs)/signup` | `/(drawer)/explore` | `/(drawer)/login` | `/(drawer)/scan` | `/(drawer)/signup` | `/(drawer)/user` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/login` | `/(tabs)/scan` | `/(tabs)/signup` | `/_sitemap` | `/explore` | `/login` | `/scan` | `/signup` | `/user`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
