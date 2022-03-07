import {
  Flex,
  Text,
  Link,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import type { NextPage } from "next";

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
  },
});

const Home: NextPage = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex m="6" w="100vw" flexDir="column">
        <Text fontFamily="monospace">Hey, I&rsquo;m Andrei.</Text>
        <Text fontFamily="monospace">I like to build web3 stuff.</Text>
        <Text fontFamily="monospace">
          You can find me{" "}
          <Link href="http://twitter.com/andreivdev" isExternal>
            @andreivdev
          </Link>{" "}
          on Twitter or{" "}
          <Link href="https://github.com/andreivdev" isExternal>
            @andreivdev
          </Link>{" "}
          on GitHub.
        </Text>

        <Text mt="10" fontFamily="monospace">
          This website is under construction.
        </Text>
        <Text fontFamily="monospace">
          I&rsquo;ll get it done sometime this decade.
        </Text>
      </Flex>
    </ChakraProvider>
  );
};

export default Home;
