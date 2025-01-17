import { Box, Text } from "@chakra-ui/react";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Snippet from "../../components/Display/Snippet";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import LatestHeading from "../../components/Heading/LatestHeading";
import LoadingSNIPS from "../../components/LoadingState/LoadingSNIPS";
import { auth, db } from "../../firebase/clientApp";
import Tags from "../../components/Home/Tags";
import { useRecoilValue } from "recoil";
import { updateStateAtom } from "../../atoms/updateStateAtom";

const MySNIPS = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(true);
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);

  const update = useRecoilValue(updateStateAtom);

  const getSnippets = async () => {
    try {
      const codeQuery = query(collection(db, "CodeSnippetsData1"));

      const errorQuery = query(collection(db, "ErrorSnippetsData1"));

      const setupQuery = query(collection(db, "SetupsData"));

      const codeDocs = await getDocs(codeQuery);
      const errorDocs = await getDocs(errorQuery);
      const setupDocs = await getDocs(setupQuery);

      Promise.all([codeDocs, errorDocs, setupDocs])
        .then((PromiseResults) => {
          const mergedSnippets = [];

          PromiseResults.forEach((snapshot) => {
            snapshot.forEach((doc) => {
              mergedSnippets.push({ ...doc.data(), id: doc.id });
            });
          });
          return mergedSnippets;
        })
        .then((mergedData) => mergedData.sort((a, b) => a.postedAt - b.postedAt).reverse())
        .then((sortedSnippets) => {
          setSnippets((prev) => ({
            ...prev,
            snips: sortedSnippets,
          }));
        })
        .catch((e) => console.log("error", e));
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    getSnippets();
    setLoading(true);
    const snapSub = onSnapshot(
      collection(db, "CodeSnippetsData1"),
      (snapshot) => {
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      snapSub();
    };
  }, [user, update]);

  return (
    <div>
      {user && (
        <div>
          <SnippetsTypeLinks />
          <div className="flex gap-6 justify-between mt-3">
            <Box bg="white" boxShadow="sm" borderRadius="lg" className="w-full">
              <LatestHeading headingType={`ALLE SNIPS`} />

              {snippets.snips && (
                <div className="flex flex-col flex-grow gap-3 p-4 w-full">
                  {snippets.snips.slice(0, 10).map((snippet) => (
                    <Snippet key={snippet.id} snippet={snippet} />
                  ))}

                  {!snippets.snips && (
                    <div className="flex justify-center mt-10 w-full">
                      <Text variant="nonLabel">Du har ingen SNIPS i denne mappe! 😔</Text>
                    </div>
                  )}
                </div>
              )}

              {loading && (
                <div className="mt-10 w-full">
                  <LoadingSNIPS size={14} />
                </div>
              )}
            </Box>
            <div className="flex-none">
              <Tags snippets={snippets} headTitle={`Tags`} tags={tags} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySNIPS;
