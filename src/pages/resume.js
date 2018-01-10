import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import colors from 'style/colors';
import { media, sizes } from 'style/sizes';

const Blob = props => <pre>{JSON.stringify(props, null, 2)}</pre>;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: baseline;
`;

const Container = styled.div`
  padding: 30px 2.5%;
  @media print {
    padding: 0px 2.5%;
  }
  max-width: 800px;
  margin: 0 auto;
  color: ${colors.black};
  h2 {
    &:after {
      content: ' ';
      display: block;
      padding-top: 2px;
      border-bottom: 1px solid ${colors.black};
    }
  }
  h3 {
    margin-bottom: 0.25em;
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  @media print {
    a {
      color: inherit;
    }
  }
`;

const Name = styled.h1`
  text-align: center;
  margin-bottom: 0.15em;
`;

const ContactData = styled.section`
  display: flex;
  flex-flow: column;
  margin: 10px 0px 5px;
  ${media.small`
    flex-flow: row wrap;
    margin: 0px;
  `};
  justify-content: center;
`;

const ContactDatum = styled.h5`
  padding: 0px 5px;
  margin-bottom: 7px;
  text-align: center;
  ${media.small`
    margin-bottom: 0px;
  `};
`;

const SectionTitle = styled.h2`
  margin-bottom: 0.3em;
  margin-top: 0.6em;
`;

const Contact = props => (
  <ContactData>
    <Link to="/">
      <ContactDatum>{props.site}</ContactDatum>
    </Link>
    <a href={`mailto:${props.email}`}>
      <ContactDatum>{props.email}</ContactDatum>
    </a>
    <a href={`https://twitter.com/${props.twitter}`} target="_blank">
      <ContactDatum>@{props.twitter}</ContactDatum>
    </a>
  </ContactData>
);

const ResumeSection = styled.section``;

const Years = styled.div`
  color: #999;
  font-size: 0.8em;
  width: 100%;
  ${media.medium`
    flex: 1;
    text-align: right;
  `};
`;

const SubTitle = styled.h3`
  font-size: 0.9em;
  margin-bottom: 0px;
`;

const SchoolSection = styled.div`
  ${media.small`
    padding-left: 13px;
  `};
  margin-top: 11px;
  ${Row} {
    margin-bottom: 10px;
    ${media.medium`
      margin-bottom: 5px;
    `};
  }
  p {
    padding-left: 15px;
    margin-top: -5px;
    margin-bottom: 0.5em;
    font-size: 0.8em;
    line-height: 1.2;
    &:not(:last-child) {
      margin-bottom: 0.5em;
    }
  }
  :last-child {
    margin-bottom: 10px;
    ${media.small`
      margin-bottom: 5px;
    `};
  }
`;

const School = props => (
  <SchoolSection>
    <Row>
      <a href={props.school.link} target="_blank">
        <SubTitle>{props.school.name}</SubTitle>
      </a>
      <Years>{props.years}</Years>
    </Row>
    {props.degree && (
      <p>
        {props.degree} {'in '}
        <a href={props.major.link} target="_blank">
          {props.major.name}
        </a>
      </p>
    )}
    {props.concentration && (
      <p>
        {'Concentration in '}
        <a href={props.concentration.link} target="_blank">
          {props.concentration.name}
        </a>
      </p>
    )}
    {props.transfer && <p>{props.transfer}</p>}
    {props.transfer && (
      <p>
        {'Studied '}
        <a href={props.major.link} target="_blank">
          {props.major.name}
        </a>
      </p>
    )}
    {props.extracurriculars &&
      props.extracurriculars.map(activity => {
        const content = activity.link ? (
          <a href={activity.link} target="_blank">
            {activity.name}
          </a>
        ) : (
          activity.name
        );
        return <p key={activity.name}>{content}</p>;
      })}
  </SchoolSection>
);

const JobSection = styled.div`
  ${media.small`
    padding-left: 13px;
  `};
  ${Row} {
    margin-bottom: 5px;
    ${media.mediumOnly`
      margin-top: 15px;
    `};
  }
  ${SubTitle} {
    display: inline-block;
  }
  p {
    ${media.small`
      padding-left: 15px;
    `};
    margin-top: -5px;
    margin-bottom: 0.5em;
    font-size: 0.8em;
    line-height: 1.2;
    &:not(:last-child) {
      margin-bottom: 0.5em;
    }
  }
  :last-child {
    margin-bottom: 10px;
    ${media.small`
      margin-bottom: 5px;
    `};
  }
`;

const Word = styled.span`
  font-size: 0.8em;
  padding: 0px 5px;
`;

const For = Word.extend`
  display: none;
  ${media.medium`
    display: inline-block;
  `};
`;

const MobileBr = styled.br`
  ${media.medium`
    display: none;
  `};
`;

const Light = styled.span`
  font-weight: 100;
`;

const Job = props => {
  let company = (
    <SubTitle>
      {props.company}
      <Light>,</Light>
    </SubTitle>
  );
  if (props.site) {
    company = (
      <a href={props.site} target="_blank">
        {company}
      </a>
    );
  }
  return (
    <JobSection>
      <Row>
        <span>
          <SubTitle>{props.role}</SubTitle>
          <For>{'for'}</For>
          <MobileBr />
          {company}
          <Word>{props.location}</Word>
        </span>
        <Years>{props.dates}</Years>
      </Row>
    </JobSection>
  );
};

const ResumePage = props => (
  <main>
    <Helmet>
      <title>Resume</title>
    </Helmet>
    <Container>
      <Name>{props.name}</Name>
      <Contact {...props} />
      <ResumeSection>
        <SectionTitle>Professional Work Experiences</SectionTitle>
        {props.work.map((job, i) => <Job key={i} {...job} />)}
      </ResumeSection>
      <ResumeSection>
        <SectionTitle>Volunteer Work Experiences</SectionTitle>
        {props.volunteer.map((job, i) => <Job key={i} {...job} />)}
      </ResumeSection>
      <ResumeSection>
        <SectionTitle>Education</SectionTitle>
        {props.education.map((school, i) => <School key={i} {...school} />)}
      </ResumeSection>
    </Container>
  </main>
);

export const pageQuery = graphql`
  query ResumeQuery {
    allResumeYaml {
      edges {
        node {
          name
          email
          site
          github
          twitter
          education {
            school {
              name
              link
            }
            degree
            major {
              name
              link
            }
            concentration {
              name
              link
            }
            years
            transfer
            extracurriculars {
              name
              link
            }
          }
          work {
            company
            location
            site
            role
            dates
          }
          volunteer {
            company
            location
            site
            role
            dates
          }
        }
      }
    }
  }
`;

const ResumeDataWrapper = props => (
  <ResumePage {...props.data.allResumeYaml.edges[0].node} />
);

export default ResumeDataWrapper;
