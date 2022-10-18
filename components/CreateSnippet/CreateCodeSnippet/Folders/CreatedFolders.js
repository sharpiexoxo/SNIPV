import { Button, Loading, Text } from "@nextui-org/react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { useRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../../../atoms/createCodeFolderModalAtom";
import { mainFolderDeleteUpdateState } from "../../../../atoms/mainFolderDeleteUpdateState";
import { mainFolderEditUpdateState } from "../../../../atoms/mainFolderEditUpdateState";
import { updateStateAtom } from "../../../../atoms/updateStateAtom";
import { auth, db } from "../../../../firebase/clientApp";
import { FaFolderPlus } from "react-icons/fa";
import { OptionFileExt, ValueFileExt } from "../../Select/SelectProps";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";
import CreatedSubFolders from "./CreatedSubFolders";
import { AddNoteIcon } from "../../../SVG/AddNoteIcon";
import MainFolderDropdown from "../../../Display/Code/MainFolderDropdown";

export default function CreatedFolders({
  setSelectedMainFolder,
  selectedMainFolder,
  setSelectedSubFolder,
  selectedSubFolder,
  id,
  selectValue,
  setSelectValue,
  setSelectSubValue,
  disableSelectInput,
}) {
  const [user] = useAuthState(auth);
  const [folders, setFolders] = useState([]);
  const [mainLoading, setMainLoading] = useState(true);

  const [open, setOpen] = useRecoilState(createCodeFolderModalState);
  const [mainDeleted, setMainDeleted] = useRecoilState(
    mainFolderDeleteUpdateState
  );

  const [mainEdited, setMainEdited] = useRecoilState(mainFolderEditUpdateState);

  const [update, setUpdate] = useRecoilState(updateStateAtom);

  function handleSelect(data) {
    setSelectValue(data);
    setSelectedMainFolder(data);
    setSelectSubValue(null);

    if (!open) {
      setSelectedSubFolder({});
    }
  }

  useEffect(() => {
    if (!user) return;
    setMainLoading(true);
    const folderColRef = collection(
      db,
      "UsersData1",
      user.uid,
      "CodeMainFolders"
    );
    const getFolders = async () => {
      const userData = await getDocs(folderColRef);
      setFolders(
        userData.docs.map((doc) => ({ ...doc.data(), mainFolderId: doc.id }))
      );
      setMainLoading(false);
    };
    getFolders();
  }, [user, update, mainDeleted]);

  useEffect(() => {
    if (mainDeleted) {
      setSelectValue(null);
      setSelectedMainFolder({});
      setMainDeleted(false);
    }
  }, [mainDeleted]);

  useEffect(() => {
    if (mainEdited) {
      setSelectValue(null);
      setSelectedMainFolder({});
      setMainEdited(false);
    }
  }, [mainEdited]);

  return (
    <div>
      {!mainLoading && (
        <>
          <div>
            {folders.length > 0 ? (
              <div className="flex flex-col">
                <div className="w-20">
                  <Text h6 transform="uppercase">
                    Rodmappe&nbsp;
                    <Text color="error" b>
                      *
                    </Text>
                  </Text>
                </div>

                <div className="flex gap-1 items-center w-full">
                  <div>
                    <Text
                      h3
                      color="primary"
                      onClick={() => {
                        setOpen({ default: true, view: 0 });
                      }}
                      className="cursor-pointer pt-3"
                    >
                      <AddNoteIcon
                        size={30}
                        fill="var(--nextui-colors-primary)"
                      />
                    </Text>
                  </div>

                  <div className="w-full">
                    <Select
                      options={folders}
                      placeholder="Valg en rodmappe"
                      value={selectValue}
                      onChange={handleSelect}
                      isSearchable={true}
                      isDisabled={disableSelectInput}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      components={{
                        NoOptionsMessage,
                        Option: OptionFileExt,
                        SingleValue: ValueFileExt,
                      }}
                    />
                  </div>

                  <div className="w-10">
                    {selectedMainFolder?.mainFolderId && (
                      <MainFolderDropdown
                        selectedMainFolder={selectedMainFolder}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <Text b size={13} transform="uppercase">
                    Du har ingen rodmapper for kode SNIPS&nbsp;
                  </Text>

                  <div>
                    <Button
                      flat
                      color="primary"
                      size="sm"
                      auto
                      onClick={() => {
                        setOpen({ default: true, view: 0 });
                      }}
                    >
                      Opret
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {mainLoading && (
        <div className="flex justify-center items-center h-20">
          <Loading size="md" />
        </div>
      )}
    </div>
  );
}
