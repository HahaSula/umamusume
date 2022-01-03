import _ from 'lodash';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { Component } from 'react';

import '../../app.css';
import './relation.css';

import { InputNumber, Row } from 'antd';
import { LocalizationData } from '../../library/common';
import characterJson from '../../db/character.json';
import relationJson from '../../db/relation.json';
import relationMemberJson from '../../db/relation_member.json';

const characters = characterJson as { [key: string]: {} };
const relations = relationJson as { [key: string]: string };
const relationMembers = relationMemberJson as { [key: string]: string[] };

interface HorseRow {
  id: string;
  name: string;
  relation: number;
  image: string;
}
interface HorseGreatRow {
  id1:string
  image1 : string;
  relation1: number;
  id2:string
  image2 : string;
  relation2: number;
  id3:string
  image3 : string;
  relation3: number;
  relationTotal: number;
}
interface HorseAllRela{
  father:HorseGreatRow
  mother:HorseGreatRow
  relation:number
}
interface HorseRela {
  id: string;
  relation: number;
}

interface Horsecompare{
  targetOne: string,
  targetTwo: string,
  targetThree: string,
  parentOne: string,
  parentTwo: string,
  grandParentOne: string,
  grandParentTwo: string,
  grandParentThree: string,
  grandParentFour: string,
  targetOneRela: number,
  targetTwoRela: number,
  targetThreeRela: number,
  sum:number,
}

interface IProps {
  localization: LocalizationData;
}

const tableStyle = {
  float: 'left',
};

interface IState {
  targetOne: string,
  targetTwo: string,
  targetThree: string,
  parentOne: string,
  parentTwo: string,
  grandParentOne: string,
  grandParentTwo: string,
  grandParentThree: string,
  grandParentFour: string,
  targetOneMin: number,
  targetTwoMin: number,
  targetThreeMin: number,
}

class ReverseQuery extends Component<IProps, IState> {
  // eslint-disable-next-line react/sort-comp
  selectTargetOne = (event: any) => {
    const { value } = event.target;
    this.setState({ targetOne: value });
  };

  selectTargetTwo = (event: any) => {
    const { value } = event.target;
    this.setState({ targetTwo: value });
  };

  selectTargetThree = (event: any) => {
    const { value } = event.target;
    this.setState({ targetThree: value });
  };

  selectTargetOneMin = (value: any) => {
    this.setState({ targetOneMin: value });
  };

  selectTargetTwoMin = (value: any) => {
    this.setState({ targetTwoMin: value });
  };

  selectTargetThreeMin = (value: any) => {
    this.setState({ targetThreeMin: value });
  };

  selectParentOne = (event: any) => {
    const { value } = event.target;
    this.setState({ parentOne: value });
  };

  selectParentTwo = (event: any) => {
    const { value } = event.target;
    this.setState({ parentTwo: value });
  };

  selectGrandParentOne = (event: any) => {
    const { value } = event.target;
    this.setState({ grandParentOne: value });
  };

  selectGrandParentTwo = (event: any) => {
    const { value } = event.target;
    this.setState({ grandParentTwo: value });
  };

  selectGrandParentThree = (event: any) => {
    const { value } = event.target;
    this.setState({ grandParentThree: value });
  };

  selectGrandParentFour = (event: any) => {
    const { value } = event.target;
    this.setState({ grandParentFour: value });
  };

  horses: string[];

  hourseRelas: { [key: string]: number };

  constructor(props: IProps) {
    super(props);
    this.horses = Object.keys(characters);
    this.hourseRelas = {};
    this.state = {
      targetOne: '1001',
      targetTwo: '1002',
      targetThree: '1003',
      parentOne: '1004',
      parentTwo: '1005',
      grandParentOne: '1006',
      grandParentTwo: '1007',
      grandParentThree: '1008',
      grandParentFour: '1009',
      targetOneMin: 0,
      targetTwoMin: 0,
      targetThreeMin: 0,
    };
  }

  calculateRelation(id1: string | undefined, id2: string): number {
    if (id1 === id2 || id1 === undefined) {
      return 0;
    }
    const targetRelations: string[] = _.intersection(relationMembers[id1], relationMembers[id2]);
    const hourseRela = _.reduce(targetRelations, (sum: number, id: string) => sum + parseInt(relations[id], 10), 0);
    return hourseRela;
  }

  calculateGrandRelation(id1: string | undefined, id2: string, id3: string): number {
    if (id1 === id2 || id1 === undefined || id1 === id3 || id2 === id3) {
      return 0;
    }
    const targetRelations: string[] = _.intersection(relationMembers[id1], relationMembers[id2], relationMembers[id3]);
    const hourseRela = _.reduce(targetRelations, (sum: number, id: string) => sum + parseInt(relations[id], 10), 0);
    return hourseRela;
  }

  calculatePairRelation(target: string | undefined, p1: string, p2: string, gp1: string, gp2: string, gp3: string, gp4: string) {
    if (target === undefined || target === p1 || target === p2 || p1 === p2) {
      return 0;
    }

    let relation:number = 0;
    relation += this.calculateRelation(target, p1);
    relation += this.calculateRelation(target, p2);
    relation += this.calculateRelation(p1, p2);
    relation += this.calculateGrandRelation(target, p1, gp1);
    relation += this.calculateGrandRelation(target, p1, gp2);
    relation += this.calculateGrandRelation(target, p2, gp3);
    relation += this.calculateGrandRelation(target, p2, gp4);

    return relation;
  }

  makeHourseList(inputId:string | undefined) {
    let hourseList : string[];
    hourseList = [];
    if (inputId === undefined) {
      return hourseList;
    }
    if (inputId === '0000') {
      hourseList = hourseList.concat(this.horses);
    } else {
      hourseList.push(inputId);
    }
    return hourseList;
  }

  buildRelationArray() {
    const relationArray : Horsecompare[] = [];

    const targetList : string[] = [];
    let p1List : string[];
    let p2List : string[];
    let gp1List : string[];
    let gp2List : string[];
    let gp3List : string[];
    let gp4List : string[];

    targetList.push(this.state.targetOne);
    targetList.push(this.state.targetTwo);
    targetList.push(this.state.targetThree);

    p1List = this.makeHourseList(this.state.parentOne);
    p2List = this.makeHourseList(this.state.parentTwo);
    gp1List = this.makeHourseList(this.state.grandParentOne);
    gp2List = this.makeHourseList(this.state.grandParentTwo);
    gp3List = this.makeHourseList(this.state.grandParentThree);
    gp4List = this.makeHourseList(this.state.grandParentFour);
    if (JSON.stringify(p1List) == JSON.stringify(p2List)) {
      console.log("yes");
    }

    for (const p1 of p1List) {
      for (const p2 of p2List) {
        for (const gp1 of gp1List) {
          for (const gp2 of gp2List) {
            for (const gp3 of gp3List) {
              for (const gp4 of gp4List) {
                if (gp3 !== gp4) {
                  const targetOneRelation:number = this.calculatePairRelation(targetList[0], p1, p2, gp1, gp2, gp3, gp4);
                  const targetTwoRelation = this.calculatePairRelation(targetList[1], p1, p2, gp1, gp2, gp3, gp4);
                  const targetThreeRelation:number = this.calculatePairRelation(targetList[2], p1, p2, gp1, gp2, gp3, gp4);
                  if (targetOneRelation !== 0 || targetTwoRelation !== 0 || targetThreeRelation !== 0) {
                    relationArray.push({
                      targetOne: targetList[0],
                      targetTwo: targetList[1],
                      targetThree: targetList[2],
                      parentOne: p1,
                      parentTwo: p2,
                      grandParentOne: gp1,
                      grandParentTwo: gp2,
                      grandParentThree: gp3,
                      grandParentFour: gp4,
                      targetOneRela: targetOneRelation,
                      targetTwoRela: targetTwoRelation,
                      targetThreeRela: targetThreeRelation,
                      sum: targetOneRelation + targetTwoRelation + targetThreeRelation,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log("123");
    console.log(relationArray);
    return relationArray;
  }

  buildBestTable(relation: Horsecompare | undefined) {
    if (relation === undefined) return <></>;
    const tagetOneImage = `${process.env.PUBLIC_URL}/static/image/character/portrait/${relation.targetOne}.png`;
    const tagetTwoImage = `${process.env.PUBLIC_URL}/static/image/character/portrait/${relation.targetTwo}.png`;
    const tagetThreeImage = `${process.env.PUBLIC_URL}/static/image/character/portrait/${relation.targetThree}.png`;

    const p1Img = `${process.env.PUBLIC_URL}/static/image/character/portrait/${relation.parentOne}.png`;
    const p2Img = `${process.env.PUBLIC_URL}/static/image/character/portrait/${relation.parentTwo}.png`;
    const gp1Img = `${process.env.PUBLIC_URL}/static/image/character/portrait/${relation.grandParentOne}.png`;
    const gp2Img = `${process.env.PUBLIC_URL}/static/image/character/portrait/${relation.grandParentTwo}.png`;
    const gp3Img = `${process.env.PUBLIC_URL}/static/image/character/portrait/${relation.grandParentThree}.png`;
    const gp4Img = `${process.env.PUBLIC_URL}/static/image/character/portrait/${relation.grandParentFour}.png`;

    return (
      <>
        <table style={{ float: 'left', marginRight: '20px' }}>
          <tr>
            <td><img className="portrait" src={tagetOneImage} alt={relation.targetOne} /></td>
            <td>
              {' '}
              {relation.targetOneRela}
            </td>
          </tr>
          <tr>
            <td><img className="portrait" src={tagetTwoImage} alt={relation.targetOne} /></td>
            <td>
              {' '}
              {relation.targetTwoRela}
            </td>
          </tr>
          <tr>
            <td><img className="portrait" src={tagetThreeImage} alt={relation.targetOne} /></td>

            <td>
              {' '}
              {relation.targetThreeRela}
            </td>
          </tr>
        </table>
        <table style={{ float: 'left', marginRight: '20px' }}>
          <tr>
            <td rowSpan={2}><img className="portrait" src={p1Img} /></td>
            <td><img className="portrait" src={gp1Img} /></td>
          </tr>
          <tr>
            <td><img className="portrait" src={gp2Img} /></td>
          </tr>
          <tr>
            <td rowSpan={2}><img className="portrait" src={p2Img} /></td>
            <td><img className="portrait" src={gp3Img} /></td>
          </tr>
          <tr>
            <td><img className="portrait" src={gp4Img} /></td>
          </tr>
        </table>
      </>
    );
  }

  render() {
    const { localization } = this.props;
    let selectParentList : string[] = [];
    selectParentList.push('0000');
    selectParentList = selectParentList.concat(this.horses);

    const relatoinArray = this.buildRelationArray().filter((hourseCompare) => (hourseCompare.targetOneRela >= this.state.targetOneMin
              && hourseCompare.targetTwoRela >= this.state.targetTwoMin
              && hourseCompare.targetThreeRela >= this.state.targetThreeMin));
    const bestRelation :Horsecompare = _.sortBy(relatoinArray, [(horseRela) => -horseRela.sum])[0];
    // eslint-disable-next-line no-console
    console.log({ bestRelation });
    const bestTable = this.buildBestTable(bestRelation);
    return (
      <div className="content">
        <div>
          <span style={{ color: 'red' }}>Four unknown uma may crash</span>
        </div>
        <div className="dropdown">
          <FormControl>
            <InputLabel id="demo-simple-select-label">Target</InputLabel>
            <Select
              defaultValue="1001"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.selectTargetOne}
            >
              { this.horses.map((targetHorseId) => (
                <MenuItem key={`${targetHorseId}_option`} value={targetHorseId}>
                  <img
                    className="portrait"
                    src={`${process.env.PUBLIC_URL}/static/image/character/portrait/${targetHorseId}.png`}
                    alt={localization.character.name[targetHorseId]}
                  />
                  {localization.character.name[targetHorseId]}
                </MenuItem>
              ))}
            </Select>
            <Select
              defaultValue="1002"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.selectTargetTwo}
            >
              { this.horses.map((targetHorseId) => (
                <MenuItem key={`${targetHorseId}_option`} value={targetHorseId}>
                  <img
                    className="portrait"
                    src={`${process.env.PUBLIC_URL}/static/image/character/portrait/${targetHorseId}.png`}
                    alt={localization.character.name[targetHorseId]}
                  />
                  {localization.character.name[targetHorseId]}
                </MenuItem>
              ))}
            </Select>
            <Select
              defaultValue="1003"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.selectTargetThree}
            >
              { this.horses.map((targetHorseId) => (
                <MenuItem key={`${targetHorseId}_option`} value={targetHorseId}>
                  <img
                    className="portrait"
                    src={`${process.env.PUBLIC_URL}/static/image/character/portrait/${targetHorseId}.png`}
                    alt={localization.character.name[targetHorseId]}
                  />
                  {localization.character.name[targetHorseId]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Parents1</InputLabel>

            <Select
              defaultValue="1004"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.selectParentOne}

            >
              { selectParentList.map((targetHorseId) => (
                <MenuItem key={`${targetHorseId}_option`} value={targetHorseId}>
                  <img
                    className="portrait"
                    src={`${process.env.PUBLIC_URL}/static/image/character/portrait/${targetHorseId}.png`}
                    alt={localization.character.name[targetHorseId]}
                  />
                  {localization.character.name[targetHorseId]}
                </MenuItem>
              ))}
            </Select>
            <Select
              defaultValue="1006"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.selectGrandParentOne}

            >
              { selectParentList.map((targetHorseId) => (
                <MenuItem key={`${targetHorseId}_option`} value={targetHorseId}>
                  <img
                    className="portrait"
                    src={`${process.env.PUBLIC_URL}/static/image/character/portrait/${targetHorseId}.png`}
                    alt={localization.character.name[targetHorseId]}
                  />
                  {localization.character.name[targetHorseId]}
                </MenuItem>
              ))}
            </Select>
            <Select
              defaultValue="1007"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.selectGrandParentTwo}

            >
              { selectParentList.map((targetHorseId) => (
                <MenuItem key={`${targetHorseId}_option`} value={targetHorseId}>
                  <img
                    className="portrait"
                    src={`${process.env.PUBLIC_URL}/static/image/character/portrait/${targetHorseId}.png`}
                    alt={localization.character.name[targetHorseId]}
                  />
                  {localization.character.name[targetHorseId]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Parents2</InputLabel>
            <Select
              defaultValue="1005"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.selectParentTwo}

            >
              { selectParentList.map((targetHorseId) => (
                <MenuItem key={`${targetHorseId}_option`} value={targetHorseId}>
                  <img
                    className="portrait"
                    src={`${process.env.PUBLIC_URL}/static/image/character/portrait/${targetHorseId}.png`}
                    alt={localization.character.name[targetHorseId]}
                  />
                  {localization.character.name[targetHorseId]}
                </MenuItem>
              ))}
            </Select>
            <Select
              defaultValue="1008"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.selectGrandParentThree}

            >
              { selectParentList.map((targetHorseId) => (
                <MenuItem key={`${targetHorseId}_option`} value={targetHorseId}>
                  <img
                    className="portrait"
                    src={`${process.env.PUBLIC_URL}/static/image/character/portrait/${targetHorseId}.png`}
                    alt={localization.character.name[targetHorseId]}
                  />
                  {localization.character.name[targetHorseId]}
                </MenuItem>
              ))}
            </Select>
            <Select
              defaultValue="1009"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.selectGrandParentFour}

            >
              { selectParentList.map((targetHorseId) => (
                <MenuItem key={`${targetHorseId}_option`} value={targetHorseId}>
                  <img
                    className="portrait"
                    src={`${process.env.PUBLIC_URL}/static/image/character/portrait/${targetHorseId}.png`}
                    alt={localization.character.name[targetHorseId]}
                  />
                  {localization.character.name[targetHorseId]}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

        </div>
        <Row gutter={[1, 3]}>
          <div className="flex">
            <span className="select-label">target 1 Min</span>
            <InputNumber className="select" defaultValue={this.state.targetOneMin} min={0} max={200} onChange={this.selectTargetOneMin} />
            <span className="select-label">target 2 Min</span>
            <InputNumber className="select" defaultValue={this.state.targetOneMin} min={0} max={200} onChange={this.selectTargetTwoMin} />
            <span className="select-label">target 3 Min</span>
            <InputNumber className="select" defaultValue={this.state.targetOneMin} min={0} max={200} onChange={this.selectTargetThreeMin} />
          </div>
        </Row>
        {bestTable}
      </div>
    );
  }
}

export default ReverseQuery;
