/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import {
  CourseCategory, CourseDataType, GroundType, LocalizationData,
} from '../../library/common';
import CourseData from '../course-data';
import CourseChart from './course-chart';

import 'react-tabs/style/react-tabs.css';

import courseJson from '../../db/course.json';

const courses = courseJson as CourseDataType[];

interface IProps {
  localization: LocalizationData
}

interface IState {
  racecourse?: string,
  ground?: GroundType,
  distance?: number,
  course?: CourseDataType,
}

class Course extends Component<IProps, IState> {
  private courseCategories: CourseCategory = {};

  constructor(props: IProps) {
    super(props);

    this.loadCourseData();
    this.state = {
      racecourse: '10009',
      ground: GroundType.Turf,
      distance: 2200,
      course: this.courseCategories['10009'][GroundType.Turf][2200],
    };
  }

  setData = (key: string, value: any): void => {
    switch (key) {
      case 'racecourse':
        this.setState({
          racecourse: value,
          ground: undefined,
          distance: undefined,
          course: undefined,
        });
        break;
      case 'ground':
        this.setState({
          ground: value as GroundType,
          distance: undefined,
          course: undefined,
        });
        break;
      case 'distance':
        this.setState(
          {
            distance: value as number,
          },
          this.updateCourse,
        );
        break;
    }
  };

  updateCourse = () => {
    const { racecourse, ground, distance } = this.state;
    let course;
    if (racecourse !== undefined && ground !== undefined && distance !== undefined) {
      if (ground in this.courseCategories[racecourse]) {
        course = this.courseCategories[racecourse][ground][distance];
      }
    }
    this.setState({ course });
  };

  loadCourseData() {
    const { localization } = this.props;
    for (const course of courses) {
      if (!(course.race_track_id in this.courseCategories)) {
        this.courseCategories[course.race_track_id] = {};
      }
      if (!(course.ground in this.courseCategories[course.race_track_id])) {
        this.courseCategories[course.race_track_id][course.ground] = {};
      }
      this.courseCategories[course.race_track_id][course.ground][course.distance+" "+localization.course.inout[course.inout]] = course;
    }
  }

  render() {
    const { localization } = this.props;
    return (
      <div className="content">
        <CourseData
          localization={localization}
          courseCategories={this.courseCategories}
          setData={this.setData}
          state={this.state}
        />
        <CourseChart
          localization={localization}
          state={this.state}
        />
      </div>
    );
  }
}

export default Course;
