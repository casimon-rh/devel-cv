import React from 'react';
//import logo from './logo.svg'
// import './App.css'
import { fetchGithub } from '../Actions/Github';
import { fetchWaka } from '../Actions/Waka';
import { fetchKnowledge } from '../Actions/Knowledge';

import Banner from './Banner';
import Menu from './Menu';
import Personal from '../Pages/Personal';
import Graphs from '../Pages/Graphs';
import School from '../Pages/School';
import Courses from '../Pages/Courses';
import Work from '../Pages/Work';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';


class Page extends React.Component {

    componentDidMount() {
        var self = this;
        self.props.dispatch(fetchKnowledge());
        self.props.dispatch(fetchGithub());
        self.props.dispatch(fetchWaka());
    }
    choosePage(current) {
        switch (current) {
            case 'GRAPH':
                return (
                    <CSSTransition key={'GRAPH'} timeout={500} classNames="fade" >
                        <Graphs
                            githubData={this.props.state.githubData}
                            wakaData={this.props.state.wakaData}
                            knowledgeData={this.props.state.knowledgeData}
                        />
                    </CSSTransition>);
            case 'SCHOOL':
                return (
                    <CSSTransition key={'SCHOOL'} timeout={500} classNames="fade" >
                        <School />
                    </CSSTransition>);
            case 'WORK':
                return (
                    <CSSTransition key={'WORK'} timeout={500} classNames="fade" >
                        <Work />
                    </CSSTransition>);
            case 'COURSE':
                return (
                    <CSSTransition key={'COURSE'} timeout={500} classNames="fade" >
                        <Courses />
                    </CSSTransition>);
            case 'PERSONAL':
                return (
                    <CSSTransition key={'PERSONAL'} timeout={500} classNames="fade" >
                        <Personal />
                    </CSSTransition>);
        }
    }
    render() {
        console.log('page', this.props.state.currentPage)
        console.log('display', this.props.state.currentPage == 'GRAPH' ? 'block' : 'none');
        return (
            <div>
                <Banner />
                <div style={{ marginTop: '150px' }}>
                    <Menu dispatch={this.props.dispatch} />
                    <TransitionGroup className="todo-list">
                        {this.choosePage(this.props.state.currentPage)}
                    </TransitionGroup>
                    <p>Source code at: <a href="https://github.com/darknesstiller/devel-cv">Github</a></p>
                    <p>Author: <a href="https://github.com/darknesstiller">@darknesstiller</a></p>
                </div>
            </div>
        );
    }
}
export default Page;