import { Box } from "@chakra-ui/react";
import React from "react";

const LanguageBadge = ({ snippet }) => {
  return (
    <>
      <div className="flex gap-2">
        {snippet?.folder?.mainFolder?.language?.langId && (
          <div
            className={`${snippet?.folder?.mainFolder?.language?.classTree} lBadge rounded-3xl flex justify-center items-center`}>
            <p className="text-xs MonoHeading font-semibold lowercase">{snippet.folder.mainFolder.language.label}</p>
          </div>
        )}

        {snippet?.folder?.language?.acc?.accId && (
          <div
            className={`${snippet?.folder?.language?.acc?.classTree} lBadge rounded-3xl flex justify-center items-center`}>
            <p className="text-xs MonoHeading font-semibold lowercase">{snippet.folder.language.acc.label}</p>
          </div>
        )}

        {snippet?.folder?.language?.fileExtension && (
          <Box bg="Primary" color="white" className={` lBadge rounded-3xl flex justify-center items-center`}>
            <p className="text-xs MonoHeading font-semibold lowercase">
              {snippet.folder.language.fileExtension?.label}
            </p>
          </Box>
        )}
      </div>
    </>
  );
};

export default LanguageBadge;
