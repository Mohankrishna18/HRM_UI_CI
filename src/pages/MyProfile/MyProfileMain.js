import React, { memo } from "react";
import { Row, Col, Card } from "react-bootstrap"


import MyProfile from "./MyProfileComponents/MyProfile";
import MyProfileTabs from "./MyProfileComponents/MyProfileTabs";

const MyProfileMain = () => {
  return (
    <div responsive className='example'>
      <Row>
        <Col>
       {/* <Card responsive className='example' style={{ marginTop: 0 }}> */}
       {/* e8eded */}
            <Card.Body style={{backgroundColor:"white" }}>
              <Card.Title> My Profile</Card.Title>
              {/* <Card.Subtitle className="mb-2 text-muted">
                Employee/My Profile
              </Card.Subtitle> */}
              <MyProfileTabs/>
              {/* <MyProfile /> */}
            </Card.Body>
          {/* </Card> */}

        </Col>
      </Row>

    </div>
  );
};
export default memo(MyProfileMain);