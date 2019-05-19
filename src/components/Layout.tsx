import React, { useState, useCallback, ReactElement } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'emotion-theming';
import Nav from 'components/Nav';
import theme from 'style/theme';
import Blur from 'components/Blur';

import 'style/global.css';

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          keywords
          description
        }
      }
      menuLinksYaml {
        links {
          path
          copy
          url
          color
        }
      }
    }
  `);
  const meta = data.site.siteMetadata;
  const links = data.menuLinksYaml.links;
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Helmet titleTemplate={`%s | ${meta.title}`} defaultTitle={meta.title}>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content={meta.keywords.join(',')} />
          <html lang="en" />
          {/* sets up twitter to display every page as a card with default info */}
          <meta name="twitter:card" content="summary" />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
        </Helmet>
        <Nav links={links} toggle={toggle} open={open} />
        <Blur blurred={open}>{children}</Blur>
      </div>
    </ThemeProvider>
  );
}
