import React, { useState, useEffect } from "react";
import axios from "axios";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

import Wrapper from "../../components/Wrapper/style";
import { ModalChampionImage } from '../../components/Modal/ModalStyle';
import FooterWrapper from "../../components/Footer";
import { dataChampions as TextWrapper } from "../../components/Text";
import '../../components/Modal/style.css';
import {
  CWrapper,
  ChampionCard,
  ChampionCardImage,
  ChampionName,
  ChampionNameDetail
} from "../Champions/style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Champions = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3333/api/champions`)
      .then((response) => {
        setData(response.data.docs);
        // console.log(response.data.docs)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Wrapper>
        <TextWrapper />
        <CWrapper>
          {data.map((champions, index) => (
            <ChampionCard key ={index} onClick={() => {handleOpen(); setActive(champions)}}>
              <ChampionCardImage image={champions.image} />
              <ChampionName>
                <ChampionNameDetail>{champions.name}</ChampionNameDetail>
              </ChampionName>
            </ChampionCard>
          ))}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <ModalChampionImage image={active.image}/>
              <div className="ModalChampion">
                <div className="ModalChampionInfo">
                  <p className="ModalChampionNickname">{active.nickname}</p>
                  <div className="ModalChampionTitle">
                    <h1 className="ModalChampionTitleDetail">{active.name}</h1>
                  </div>
                  <div className="ModalChampionInfoContent">
                    <div className="ModalChampionDifficulty">
                      <h3 className="ModalChampionInfoDetail">
                        DIFFICULTY
                        <p className="ModalChampionDifficultyDetail">{active.difficulty}</p>
                      </h3>
                    </div>
                    <div className="ModalChampionRole">
                      <h3 className="ModalChampionInfoDetail">
                        ROLE
                        <p className="ModalChampionRoleDetail">{active.role}</p>
                      </h3>
                    </div>
                  </div>
                  <div className="ModalChampionBiography">
                      <p className="ModalChampionBiographyDetail">{active.biography}</p>
                  </div>
                  <div className="ModalChampionAbilitiesTitle">
                    <h1 className="ModalChampionAbilitiesTitleDetail">ABILITIES</h1>
                  </div>
                  {active.skills ? active.skills.map(skill => (
                    <div className="ModalChampionAbilities" key={skill._id}>
                      <div className="ModalChampionAbilitiesContainer">
                        <div className="ModalChampionAbilitiesNameContainer">
                          <h2 className="ModalChampionAbilitiesName">
                            {skill.ability}
                          </h2>
                        </div>
                        <div className="ModalChampionAbilitiesContent">
                          <div className="ModalChampionAbilitiesImage">
                            <img src={skill.skill_image} alt="Skill" title={skill.ability}/>
                          </div>
                          <div className="ModalChampionAbilitiesDescription">
                            <p className="ModalChampionAbilitiesDescriptionDetail">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )): null}  
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CWrapper>
      </Wrapper>
      <FooterWrapper />
    </>
  );
}

export default Champions;
