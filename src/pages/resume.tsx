import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Meta from 'components/Meta';
import sizes from 'style/sizes';

const meta = {
  title: 'Resume',
  description: 'My life in one page',
};

/**
 * Handles the formatting for the different expected types of date range data
 * @param {Object|String} dates
 */
const datesFormatter = dates => {
  if (!dates) return null;
  if (typeof dates === 'string') return dates;
  const { start, end, recurring } = dates;
  if (recurring) return recurring.join(', ');
  if (!end) return `${start} - Present`;
  return `${start} - ${end}`;
};

const TopRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: baseline;
`;

const SectionTitle = styled.h2`
  margin-bottom: 0.3em;
  margin-top: 0.6em;
`;

const Container = styled.div`
  padding: 30px 2.5%;
  max-width: 800px;
  margin: 0 auto;
  color: ${props => props.theme.black};
  ${SectionTitle} {
    &:after {
      content: ' ';
      display: block;
      padding-top: 2px;
      border-bottom: 1px solid ${props => props.theme.black};
    }
  }
  a {
    text-decoration: none;
    &:active {
      color: #f78409;
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
  font-size: 2em;
`;

const ContactData = styled.section`
  display: flex;
  flex-flow: column;
  margin: 10px 0px 5px;
  @media (min-width: ${sizes.small}) {
    flex-flow: row wrap;
    margin: 0px;
  }
  justify-content: center;
`;

const ContactDatum = styled.h5`
  padding: 0px 5px;
  margin-bottom: 7px;
  text-align: center;
  @media (min-width: ${sizes.small}) {
    margin-bottom: 0px;
  }
`;

const Contact = props => (
  <ContactData>
    <ContactDatum>
      <Link to="/">{props.site}</Link>
    </ContactDatum>
    <ContactDatum>
      <a href={`mailto:${props.email}`}>{props.email}</a>
    </ContactDatum>
  </ContactData>
);

const StyledYears = styled.div`
  color: #999;
  font-size: 0.8em;
  width: 100%;
  white-space: nowrap;
  @media (min-width: ${sizes.medium}) {
    flex: 1;
    text-align: right;
  }
`;

const Years = ({ children }) => (
  <StyledYears>{datesFormatter(children)}</StyledYears>
);

const SubTitle = styled.h4`
  font-size: 0.9em;
  margin-bottom: 0px;
`;

const Title = styled(SubTitle)`
  @media (max-width: ${sizes.smallMax}) {
    font-size: 1.1em;
  }
`;

const SchoolSection = styled.div`
  padding: 10px;
  @media (min-width: ${sizes.medium}) {
    padding: 7px 8px;
  }
  ${TopRow} {
    margin-bottom: 6px;
  }
  p {
    @media (min-width: ${sizes.small}) {
      padding-left: 8px;
    }
    margin-top: -3px;
    margin-bottom: 0.5em;
    font-size: 0.8em;
    line-height: 1.2;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const School = props => (
  <SchoolSection>
    <TopRow>
      <Title>
        <a href={props.school.link} target="_blank" rel="noopener noreferrer">
          {props.school.name}
        </a>
      </Title>
      <Years>{props.years}</Years>
    </TopRow>
    {props.degree && (
      <p>
        {props.degree} {'in '}
        <a href={props.major.link} target="_blank" rel="noopener noreferrer">
          {props.major.name}
        </a>
      </p>
    )}
    {props.concentration && (
      <p>
        {'Concentration in '}
        <a
          href={props.concentration.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.concentration.name}
        </a>
      </p>
    )}
    {props.transfer && <p>{props.transfer}</p>}
    {props.transfer && (
      <p>
        {'Studied '}
        <a href={props.major.link} target="_blank" rel="noopener noreferrer">
          {props.major.name}
        </a>
      </p>
    )}
    {props.extracurriculars &&
      props.extracurriculars.map(activity => {
        const content = activity.link ? (
          <a href={activity.link} target="_blank" rel="noopener noreferrer">
            {activity.name}
          </a>
        ) : (
          activity.name
        );
        return <p key={activity.name}>{content}</p>;
      })}
  </SchoolSection>
);

const JobContainer = styled.div`
  align-items: baseline;
  padding: 10px;
  @media (min-width: ${sizes.medium}) {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    padding: 4px 8px;
  }
  ${Title}, ${SubTitle} {
    display: inline-block;
  }
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StoryLink = JobContainer.withComponent(Link);

const jobWithStoryCss = css`
  display: block;
  text-decoration: none;
  transition: background-color 250ms;
  &:hover,
  &:focus {
    background-color: #eee;
  }
`;

const Word = styled.span`
  font-size: 0.8em;
  @media (min-width: ${sizes.medium}) {
    padding: 0px 5px;
  }
`;

const For = styled(Word)`
  display: none;
  @media (min-width: ${sizes.medium}) {
    display: inline-block;
  }
`;

const MobileBr = styled.br`
  @media (min-width: ${sizes.medium}) {
    display: none;
  }
`;

const Comma = styled.span`
  font-weight: 100;
  display: none;
  :after {
    content: ',';
  }
  @media (min-width: ${sizes.medium}) {
    display: inherit;
  }
`;

const Job = props => {
  let company = props.company;
  if (!props.story && props.site) {
    company = (
      <a href={props.site} target="_blank" rel="noopener noreferrer">
        {company}
      </a>
    );
  }

  const content = (
    <>
      <Title>{props.role}</Title>
      <For>{'for'}</For>
      <MobileBr />
      <SubTitle>{company}</SubTitle>
      <Comma />
      <MobileBr />
      <Word>{props.location}</Word>
      <Years>{props.dates}</Years>
    </>
  );
  if (props.story) {
    return (
      <StoryLink to={props.story} css={jobWithStoryCss}>
        {content}
      </StoryLink>
    );
  }
  return <JobContainer>{content}</JobContainer>;
};

const ResumePage = props => (
  <main>
    <Meta {...meta} />
    <Container>
      <Name>{props.name}</Name>
      <Contact {...props} />
      <section>
        <SectionTitle>Experience</SectionTitle>
        {props.work.map((job, i) => (
          <Job key={i} {...job} />
        ))}
      </section>
      <section>
        <SectionTitle>Volunteer Experience</SectionTitle>
        {props.volunteer.map((job, i) => (
          <Job key={i} {...job} />
        ))}
      </section>
      <section>
        <SectionTitle>Education</SectionTitle>
        {props.education.map((school, i) => (
          <School key={i} {...school} />
        ))}
      </section>
    </Container>
    <Global
      styles={css`
        @page {
          margin: 5mm 10mm 5mm 10mm;
        }
        @media print {
          section {
            page-break-inside: avoid;
          }
        }
      `}
    />
  </main>
);

export default function Resume() {
  const data = useStaticQuery(graphql`
    query ResumeQuery {
      resumeYaml {
        name
        email
        site
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
          years {
            start(formatString: "MMM YYYY")
            end(formatString: "MMM YYYY")
          }
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
          story
          dates {
            start(formatString: "MMM YYYY")
            end(formatString: "MMM YYYY")
          }
        }
        volunteer {
          company
          location
          site
          role
          dates {
            start(formatString: "MMM YYYY")
            end(formatString: "MMM YYYY")
            recurring(formatString: "MMM YYYY")
          }
        }
      }
    }
  `);
  return <ResumePage {...data.resumeYaml} />;
}
