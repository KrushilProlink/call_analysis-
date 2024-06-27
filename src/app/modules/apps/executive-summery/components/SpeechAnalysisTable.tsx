import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface RecruiterData {
  imp_com: string[];
  recruiter: string;
}

interface Parameter {
  key: string;
  recruiter_data: RecruiterData[];
}

interface Category {
  category: string;
  parameters: Parameter[];
}

type Props = {
  trainingAnalysis: Category[];
  isLoading: boolean;
};

const SpeechAnalysisTable: React.FC<Props> = ({
  trainingAnalysis = [],
  isLoading,
}) => {
  const [openCategories, setOpenCategories] = useState(
    Array(trainingAnalysis?.length).fill(false)
  );
  const [openParameters, setOpenParameters] = useState(
    trainingAnalysis?.map((category) =>
      Array(category?.parameters?.length).fill(false)
    )
  );
  const [openRecruiters, setOpenRecruiters] = useState(
    trainingAnalysis?.map((category) =>
      category?.parameters?.map((param) =>
        Array(param?.recruiter_data?.length).fill(false)
      )
    )
  );

  const toggleCategory = (categoryIndex: number) => {
    const newOpenCategories = [...openCategories];
    newOpenCategories[categoryIndex] = !newOpenCategories[categoryIndex];
    setOpenCategories(newOpenCategories);
  };

  const toggleParameter = (categoryIndex: number, paramIndex: number) => {
    const newOpenParameters = [...openParameters];
    newOpenParameters[categoryIndex][paramIndex] =
      !newOpenParameters[categoryIndex][paramIndex];
    setOpenParameters(newOpenParameters);
  };

  const toggleRecruiter = (
    categoryIndex: number,
    paramIndex: number,
    recruiterIndex: number
  ) => {
    const newOpenRecruiters = [...openRecruiters];
    newOpenRecruiters[categoryIndex][paramIndex][recruiterIndex] =
      !newOpenRecruiters[categoryIndex][paramIndex][recruiterIndex];
    setOpenRecruiters(newOpenRecruiters);
  };

  const replaceUnderscoreWithSpace = (inputString: string) => {
    return inputString?.replace(/_/g, " ");
  };

  const renderRecruiterComments = (
    recruiterData: RecruiterData[],
    categoryIndex: number,
    paramIndex: number
  ) => {
    return recruiterData?.map((recruiter, recruiterIndex) => (
      <React.Fragment
        key={`${paramIndex}-${recruiter?.recruiter}-${recruiterIndex}`}
      >
        <ListItem
          button
          onClick={() =>
            toggleRecruiter(categoryIndex, paramIndex, recruiterIndex)
          }
          style={{ backgroundColor: "#1b84ff63" }}
        >
          <ListItemText
            primary={recruiter?.recruiter}
            style={{ marginLeft: "40px" }}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              {openRecruiters[categoryIndex][paramIndex][recruiterIndex] ? (
                <RemoveIcon
                  onClick={() =>
                    toggleRecruiter(categoryIndex, paramIndex, recruiterIndex)
                  }
                />
              ) : (
                <AddIcon
                  onClick={() =>
                    toggleRecruiter(categoryIndex, paramIndex, recruiterIndex)
                  }
                />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse
          in={openRecruiters[categoryIndex][paramIndex][recruiterIndex]}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {recruiter?.imp_com?.map((comment, commentIndex) => (
              <ListItem
                key={`${paramIndex}-${recruiter?.recruiter}-${commentIndex}`}
                style={{ paddingLeft: 32, background: "#1b84ff24" }}
              >
                <ListItemText
                  primary={comment}
                  style={{ marginLeft: "60px" }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider />
      </React.Fragment>
    ));
  };

  const renderParameters = (parameters: Parameter[], categoryIndex: number) => {
    return parameters?.map((param, paramIndex) => (
      <React.Fragment key={param?.key}>
        <ListItem
          button
          onClick={() => toggleParameter(categoryIndex, paramIndex)}
          style={{ backgroundColor: "#1b84ff9c" }}
        >
          <ListItemText
            primary={replaceUnderscoreWithSpace(param?.key)}
            className="text-capitalize"
            style={{ marginLeft: "10px" }}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              {openParameters[categoryIndex][paramIndex] ? (
                <RemoveIcon
                  onClick={() => toggleParameter(categoryIndex, paramIndex)}
                />
              ) : (
                <AddIcon
                  onClick={() => toggleParameter(categoryIndex, paramIndex)}
                />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse
          in={openParameters[categoryIndex][paramIndex]}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {renderRecruiterComments(
              param?.recruiter_data,
              categoryIndex,
              paramIndex
            )}
          </List>
        </Collapse>
        <Divider />
      </React.Fragment>
    ));
  };

  const renderTableBody = () => {
    return (
      <>
        {trainingAnalysis?.map((categoryItem, categoryIndex) => (
          <Card key={categoryIndex} className="mt-5">
            <CardContent
              onClick={() => toggleCategory(categoryIndex)}
              style={{
                cursor: "pointer",
                backgroundColor: "#1b84ff",
                padding: "4px 10px",
              }}
            >
              <Typography
                className="text-light"
                style={{
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {categoryItem.category}
                <IconButton style={{ float: "right", color: "white" }}>
                  {openCategories[categoryIndex] ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              </Typography>
            </CardContent>
            <Collapse
              in={openCategories[categoryIndex]}
              timeout="auto"
              unmountOnExit
            >
              <CardContent className="p-0">
                <List>
                  {renderParameters(categoryItem?.parameters, categoryIndex)}
                </List>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </>
    );
  };

  return (
    <Box p={3} style={{ backgroundColor: "#f9f9f9" }}>
      {!isLoading ? (
        renderTableBody()
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "160px 0",
          }}
        >
          <span className="spinner-border text-primary" role="status"></span>
          <span className="text-muted fs-6 fw-semibold mt-5">Loading...</span>
        </div>
      )}
      {trainingAnalysis?.length === 0 && !isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "160px 0",
          }}
        >
          <span className="text-muted fs-6 fw-semibold mt-5">
            No Data Found
          </span>
        </div>
      )}
    </Box>
  );
};

export default SpeechAnalysisTable;
