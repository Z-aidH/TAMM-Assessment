import React, { useMemo } from "react";
import UniversityDetails from "../components/UniversityDetails/UniversityDetails";
import { useParams } from "react-router-dom";

//details container
const UniversityDetailsContainer = ({ getUniversity }) => {
  const { id } = useParams();

  const university = useMemo(() => getUniversity(id), [getUniversity, id]);

  return <UniversityDetails university={university} />;
};

export default UniversityDetailsContainer;
