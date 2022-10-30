import { Divider, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import StatsSettings from "../../components/Settings/Stats";

const StatsPage = () => {
  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Statistikker - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="w-full">
          <Text textTransform="uppercase" fontWeight="semibold" fontSize={18}>
            Stats
          </Text>
        </div>
        <Divider my={2} />
        <div className="w-full">
          <StatsSettings />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
