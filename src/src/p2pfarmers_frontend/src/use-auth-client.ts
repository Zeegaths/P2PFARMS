import * as React from "react";
import {
  AuthClient,
  AuthClientCreateOptions,
  AuthClientLoginOptions,
} from "@dfinity/auth-client";
import {
  type Identity,
  type Agent,
  type HttpAgentOptions,
  type ActorConfig,
  HttpAgent,
  Actor,
} from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";

export interface CreateActorOptions {
  /**
   * @see {@link Agent}
   */
  agent?: Agent;
  /**
   * @see {@link HttpAgentOptions}
   */
  agentOptions?: HttpAgentOptions;
  /**
   * @see {@link ActorConfig}
   */
  actorOptions?: ActorConfig;

  idlFactory: IDL.InterfaceFactory;

  canisterId: Principal | string;
}

/**
 * Options for the useAuthClient hook
 */
export type UseAuthClientOptions = {
  /**
   * Options passed during the creation of the auth client
   */
  createOptions?: AuthClientCreateOptions;
  /**
   * Options passed during the login of the auth client
   */
  loginOptions?: AuthClientLoginOptions;
  /**
   * Options to create an actor using the auth client identity
   */
  actorOptions?: CreateActorOptions;
};

/**
 * React hook to set up the Internet Computer auth client
 * @param {UseAuthClientOptions} options configuration for the hook
 * @see {@link UseAuthClientOptions}
 * @param {AuthClientCreateOptions} options.createOptions  - options passed during the creation of the auth client
 * @param {AuthClientLoginOptions} options.loginOptions -
 */
export function useAuthClient(options?: UseAuthClientOptions) {
  const [authClient, setAuthClient] = React.useState<AuthClient | null>(null);
  const [identity, setIdentity] = React.useState<Identity | null>(null);
  const [actor, setActor] = React.useState<Actor | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  // load the auth client on mount
  React.useEffect(() => {
    AuthClient.create({
      ...options?.createOptions,
      idleOptions: {
        ...options?.createOptions?.idleOptions,
        onIdle:
          options?.createOptions?.idleOptions?.onIdle ??
          (() => {
            logout();
          }),
      },
    }).then(async (client) => {
      setAuthClient(client);
      setIdentity(client.getIdentity());
      setIsAuthenticated(await client.isAuthenticated());
    });
  }, []);

  React.useEffect(() => {
    if (identity && options?.actorOptions) {
      createActor({
        ...options.actorOptions,
        agentOptions: { ...options?.actorOptions?.agentOptions, identity },
      }).then((actor) => {
        setActor(actor);
      });
    }
  }, [identity]);

  /**
   * Login through your configured identity provider
   * Wraps the onSuccess and onError callbacks with promises for convenience
   * @returns {Promise<InternetIdentityAuthResponseSuccess | void>} - Returns a promise that resolves to the response from the identity provider
   */
  function login(): Promise<any | void> {
    return new Promise((resolve, reject) => {
      if (authClient) {
        const callback = options?.loginOptions?.onSuccess;
        const errorCb = options?.loginOptions?.onError;

        authClient.login({
          ...options?.loginOptions,
          onSuccess: (successResponse?: any) => {
            setIsAuthenticated(true);
            setIdentity(authClient.getIdentity());
            if (successResponse !== undefined) {
              callback?.(successResponse);
            } else {
              callback?.(successResponse);
            }
            resolve(successResponse);
          },
          onError: (error) => {
            errorCb?.(error);
            reject(error);
          },
          windowOpenerFeatures:
            `left=${window.screen.width / 2 - 525 / 2}, ` +
            `top=${window.screen.height / 2 - 705 / 2},` +
            `toolbar=0,location=0,menubar=0,width=525,height=705`,
        });
      }
    });
  }

  async function logout() {
    if (authClient) {
      setIsAuthenticated(false);
      setIdentity(null);
      await authClient.logout();

      if (options?.actorOptions) {
        setActor(await createActor(options.actorOptions));
      }
    }
  }

  return {
    actor,
    authClient,
    identity,
    isAuthenticated,
    login,
    logout,
  };
}

const createActor = async (options: CreateActorOptions) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(options.idlFactory, {
    agent,
    canisterId: options.canisterId,
    ...options.actorOptions,
  });
};
