import { Icon, Text } from "@chakra-ui/react";
import { Button, Input, Tooltip } from "@nextui-org/react";
import React from "react";
import { BsQuestionCircleFill } from "react-icons/bs";

const General = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 my-2">
        <div>
          <div className="flex gap-1">
            <Text>Domain</Text>
            <Tooltip
              content={
                <Text color="white">
                  Din hosting domain uden &nbsp;
                  <Text color="error">https://www&nbsp;</Text>
                </Text>
              }
              color="primary"
              keepMounted="true"
              css={{ zIndex: 999999 }}
              className="mt-1"
            >
              <Icon as={BsQuestionCircleFill} w={9} h={9} />
            </Tooltip>
          </div>
          <div>
            <Input
              aria-label="domain"
              bordered
              labelLeft="https://"
              placeholder="snipv.vercel.app"
              width="40vw"
              disabled
            />
          </div>
        </div>

        <div>
          <div className="flex gap-1">
            <Text>Github repository</Text>
            <Tooltip
              content={
                <Text color="white">Link til din forked Github repository</Text>
              }
              color="primary"
              keepMounted="true"
              css={{ zIndex: 999999 }}
              className="mt-1"
            >
              <Icon as={BsQuestionCircleFill} w={9} h={9} />
            </Tooltip>
          </div>
          <div>
            <Input
              aria-label="domain"
              bordered
              placeholder="https://github.com/smartercow/SNIPV"
              width="40vw"
              disabled
            />
          </div>
        </div>

        <div>
          <Button disabled>Gem</Button>
        </div>
      </div>
    </div>
  );
};

export default General;
