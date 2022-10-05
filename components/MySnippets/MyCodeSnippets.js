import { Badge, Button, Card, Loading, Popover, Text } from "@nextui-org/react";
import {
  collection,
  deleteDoc,
  doc,
  FieldPath,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/clientApp";
import NoUser from "../NoPage/NoUser";
import { MdRefresh } from "react-icons/md";
import LatestHeading from "../Heading/LatestHeading";
import Snippet from "../Display/Snippet";

const MyCodeSnippets = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [myCodeSnippets, setMyCodeSnippets] = useState();
  const [lastSnippet, setLastSnippet] = useState();
  const [update, setUpdate] = useState(false);

  const [truncate, setTruncate] = useState(50);

  const [isEmpty, setIsEmpty] = useState(false);

  const getMySnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
        where(new FieldPath("userData", "uid"), "==", user?.uid),
        orderBy("postedAt", "desc"),
        limit(10)
      );
      const snippetDocs = await getDocs(snippetQuery);

      const colEmpty = snippetDocs.docs.length === 0;

      if (snippetDocs.docs.length < 10) {
        setIsEmpty(true);
      }

      if (!colEmpty) {
        const lastDoc = snippetDocs.docs[snippetDocs.docs.length - 1];
        const snippets = snippetDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLastSnippet(lastDoc);
        setMyCodeSnippets(snippets);
        setLoading(false);
      } else {
        setIsEmpty(true);
        setLoading(false);
      }
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  const fetchMore = async () => {
    setLoading(true);
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
        where(new FieldPath("userData", "uid"), "==", user?.uid),
        orderBy("postedAt", "desc"),
        startAfter(lastSnippet),
        limit(10)
      );
      const snippetDocs = await getDocs(snippetQuery);

      const colEmpty = snippetDocs.size === 0;

      if (!colEmpty) {
        const lastDoc = snippetDocs.docs[snippetDocs.docs.length - 1];
        const snippets = snippetDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLastSnippet(lastDoc);

        setMyCodeSnippets((prev) => [...prev, ...snippets]);
        setLoading(false);
      } else {
        setIsEmpty(true);
        setLoading(false);
      }
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMySnippets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, update]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "CodeSnippetsData1", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1100px)").matches) {
        setTruncate(90);
      } else if (window.matchMedia("(min-width: 900px)").matches) {
        setTruncate(60);
      } else if (window.matchMedia("(min-width: 600px)").matches) {
        setTruncate(40);
      } else if (window.matchMedia("(min-width: 400px)").matches) {
        setTruncate(20);
      }
    });
  }, [truncate]);

  // console.log("MY SNIPPETS", myCodeSnippets);

  return (
    <div className="min-h-[70vh] w-full">
      <>
        <LatestHeading headingType={"Alle kode SNIPS"} />
      </>

      <div className="w-full">
        <div className="flex flex-col gap-4">
          {myCodeSnippets && (
            <>
              {myCodeSnippets?.map((snippet) => (
                <Snippet key={snippet.id} handleDelete={handleDelete} snippet={snippet} />
              ))}

              {!isEmpty && (
                <div className="flex justify-center">
                  <Button size="sm" onClick={fetchMore}>
                    <MdRefresh />
                    HENT MERE
                  </Button>
                </div>
              )}
            </>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-[20vh]">
              <Loading size="lg" />
            </div>
          ) : (
            <>
              {!myCodeSnippets?.length > 0 && (
                <div className="flex justify-center mt-10">
                  <Text b size={13} transform="uppercase">
                    Du har ingen kode SNIPS! 😔
                  </Text>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCodeSnippets;
