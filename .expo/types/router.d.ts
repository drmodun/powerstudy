/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/` | `/(drawer)/(tabs)` | `/(drawer)/(tabs)/` | `/(drawer)/(tabs)/explore` | `/(drawer)/(tabs)/notes` | `/(drawer)/(tabs)/scan` | `/(drawer)/explore` | `/(drawer)/notes` | `/(drawer)/scan` | `/(drawer)/user` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/notes` | `/(tabs)/scan` | `/_sitemap` | `/explore` | `/login` | `/notes` | `/scan` | `/signup` | `/user`;
      DynamicRoutes: `/(drawer)/(tabs)/notes/${Router.SingleRoutePart<T>}` | `/(drawer)/(tabs)/notes/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}` | `/(drawer)/(tabs)/notes/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}` | `/(drawer)/notes/${Router.SingleRoutePart<T>}` | `/(drawer)/notes/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}` | `/(drawer)/notes/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}` | `/(tabs)/notes/${Router.SingleRoutePart<T>}` | `/(tabs)/notes/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}` | `/(tabs)/notes/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}` | `/notes/${Router.SingleRoutePart<T>}` | `/notes/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}` | `/notes/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(drawer)/(tabs)/notes/[subject]` | `/(drawer)/(tabs)/notes/[subject]/[notes]` | `/(drawer)/(tabs)/notes/[subject]/[notes]/[note]` | `/(drawer)/notes/[subject]` | `/(drawer)/notes/[subject]/[notes]` | `/(drawer)/notes/[subject]/[notes]/[note]` | `/(tabs)/notes/[subject]` | `/(tabs)/notes/[subject]/[notes]` | `/(tabs)/notes/[subject]/[notes]/[note]` | `/notes/[subject]` | `/notes/[subject]/[notes]` | `/notes/[subject]/[notes]/[note]`;
    }
  }
}
