import React from "react";

import Layout from "@theme/Layout";

import "./styles.css";
import TutorialFilters from "../../components/TutorialFilters";
import TutorialCards from "../../components/TutorialCards";

function TutorialHeader() {
  return (
    <section className="container margin-top--lg margin-bottom--lg text--center">
      <div className="row">
        <div className="col col--2 col--offset-0">
          <h1 className="tutorial-header">Tutorials</h1>
        </div>
      </div>
    </section>
  );
}

function Tutorials(): JSX.Element {
  return (
    <Layout>
      <main className="margin-vert--lg">
        <TutorialHeader />
        <TutorialFilters />
        <TutorialCards />
      </main>
    </Layout>
  );
}

export default Tutorials;
