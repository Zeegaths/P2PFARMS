import { LOGIN, LOGOUT, useAuth } from "./AuthContext";
import { useEffect } from "react";
import { createBackendActor, createClient } from "../helper/auth";
import { useNavigate } from "react-router-dom";
import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
import { backend } from "../../../declarations/backend";

let actor = backend;

/**
 * Higher order component to check if user is authenticated
 *
 * This ensures that the user is authenticated before rendering the component
 * If a user is authenticated but not a member, they are logged out
 * @param Component
 */
function withAuth(Component) {
  return function WithAuth(props) {
    const { state, dispatch } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
      async function checkAuthenticated() {
        const authClient = await createClient();
        if (await authClient.isAuthenticated()) {
          const identity = authClient.getIdentity();
          actor = await createBackendActor(identity);
          const response = await actor.getProfile(identity.getPrincipal());
          const member = response.ok;
          if (!member) {
            toast({
              title: "You are not registered yet",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: 'top',
            });
            dispatch({
              type: LOGOUT,
            });
            navigate('/')
          } else {
            dispatch({
              type: LOGIN,
              payload: {
                principal: identity.getPrincipal(),
                member,
              },
            });
          }
        } else {
          toast({
            title: "You are not logged in",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          dispatch({
            type: LOGOUT,
          });
          navigate('/')
        }
      }
      checkAuthenticated();
    }, [dispatch]);

    if (state.isAuthenticated) {
      return <Component {...props} />;
    } else {
      return (
        <Box h={"100vh"}>
          <Center h={"100%"}>
            <Spinner size={"xl"} />
          </Center>
        </Box>
      );
    }
  };
}

export default withAuth;