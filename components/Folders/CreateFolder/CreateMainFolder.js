import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CreateFolderModalState } from "../../../atoms/CreateFolderModalAtom";
import { mainFolderEditUpdateState } from "../../../atoms/mainFolderEditUpdateState";
import { updateStateAtom } from "../../../atoms/updateStateAtom";
import { auth, db } from "../../../firebase/clientApp";
import { LanguageOptions } from "../../../utilities/Language";
import { JavaScriptFrameworks } from "../../../utilities/Language/JavaScript/Frameworks";
import { JavaScriptLibraries } from "../../../utilities/Language/JavaScript/Libraries";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";
import { useRouter } from "next/router";
import { Button, Input, Text } from "@chakra-ui/react";

const initialSelectedLanguage = {
  label: "JavaScript",
  value: "javascript",
  langId: "1",
  fileExtensions: [
    { label: ".js", value: "js", syntaxHighlight: "javascript" },
  ],
  accessory: true,
  accessories: [
    {
      label: "Framework",
      value: "framework",
      accessoryId: "1",
      langId: "1",
      options: JavaScriptFrameworks,
    },
    {
      label: "Library",
      value: "library",
      accessoryId: "2",
      langId: "1",
      options: JavaScriptLibraries,
    },
  ],
};

const CreateMainFolder = ({ selectedMainFolder }) => {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();
  const setOpen = useSetRecoilState(CreateFolderModalState);
  const setEditState = useSetRecoilState(mainFolderEditUpdateState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  const [folderName, setFolderName] = useState("");
  const randomValue = (Math.random() + 2).toString(36).substring(2);

  const [language, setLanguage] = useState(initialSelectedLanguage);

  const [disableBtn, setDisableBtn] = useState(true);
  const [disableSelectInput, setDisableSelectInput] = useState(false);

  const [mainFolder, setMainFolder] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (
      asPath.startsWith("/upsert/code") ||
      selectedMainFolder?.folderSnippetType === "code"
    ) {
      setMainFolder("CodeMainFolders");
      setType("code");
    }
    if (
      asPath.startsWith("/upsert/error") ||
      selectedMainFolder?.folderSnippetType === "error"
    ) {
      setMainFolder("ErrorMainFolders");
      setType("error");
    }
    if (
      asPath.startsWith("/upsert/setup") ||
      selectedMainFolder?.folderSnippetType === "setup"
    ) {
      setMainFolder("SetupMainFolders");
      setType("setup");
    }
  }, [asPath, selectedMainFolder]);

  const sortedLanguageOptions = useMemo(
    () =>
      LanguageOptions.sort(({ label: labelA = "" }, { label: labelB = "" }) =>
        labelA.localeCompare(labelB)
      ),
    [LanguageOptions]
  );

  function handleSelectLanguage(data) {
    setLanguage(data);
  }

  useEffect(() => {
    if (language && folderName) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [language, folderName]);

  useEffect(() => {
    if (selectedMainFolder?.mainFolderId) {
      setDisableSelectInput(true);
      setLanguage(selectedMainFolder.language);
      setFolderName(selectedMainFolder.label);
    }
  }, [selectedMainFolder]);

  const createFolder = async (e) => {
    e.preventDefault();
    if (folderName) {
      setDisableBtn(true);

      if (!selectedMainFolder?.mainFolderId) {
        try {
          await addDoc(collection(db, "UsersData1", user?.uid, mainFolder), {
            createdAt: serverTimestamp(),
            rootDirectory: "main",
            folderSnippetType: type,
            label: folderName,
            value: randomValue,
            language: {
              label: language.label,
              value: language.value,
              langId: language.langId,
              accessory: language.accessory,
              classTree: `lang${language.langId}`,
              fileExtension: language.fileExtensions,
            },
            userId: user.uid,
          });
          setOpen(false), setUpdate(!update);
        } catch (error) {
          setDisableBtn(false);
        }
      } else {
        try {
          await updateDoc(
            doc(
              db,
              "UsersData1",
              user?.uid,
              mainFolder,
              selectedMainFolder.mainFolderId
            ),
            {
              updatedAt: serverTimestamp(),
              label: folderName,
            }
          );
        } catch (error) {
          setDisableBtn(false);
        } finally {
          setOpen(false),
            setUpdate(!update),
            setEditState({ default: true, folder: selectedMainFolder });
        }
      }
    } /* else {
      setInputStatus("- skal udfyldes!");
    } */
  };

  return (
    <div>
      <form onSubmit={createFolder}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex">
              <Text variant="H5">Navn&nbsp;</Text>
            </div>
            <Input
              placeholder="Mappe navn"
              onChange={(e) => setFolderName(e.target.value)}
              value={folderName}
              aria-label="Folder name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>
              <Text variant="H5">Sprog</Text>
            </div>
            <div className="w-full">
              <Select
                options={sortedLanguageOptions}
                placeholder="Søg og valg"
                value={language}
                onChange={handleSelectLanguage}
                isDisabled={disableSelectInput}
                isSearchable={true}
                className="w-full"
                aria-label="Select"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                components={{
                  NoOptionsMessage,
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end my-2">
            <Button
              color="Red"
              onClick={() => setOpen(false)}
              variant="btnCloseGhost"
            >
              Luk
            </Button>
            {selectedMainFolder?.mainFolderId ? (
              <Button disabled={disableBtn} color="Primary" type="submit">
                Opdatere
              </Button>
            ) : (
              <Button disabled={disableBtn} type="submit" variant="btnMain">
                Opret
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMainFolder;
