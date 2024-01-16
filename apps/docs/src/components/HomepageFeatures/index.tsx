import styles from "./styles.module.css";

import Heading from "@theme/Heading";
import clsx from "clsx";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Navigate",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Crab Stash Documentation is organized intuitively, making it easy for users to find the
        information they need. Our navigation system ensures a smooth and efficient browsing
        experience, allowing users to quickly locate relevant details about fields, categories,
        products, and user roles.
      </>
    ),
  },
  {
    title: "Effortless Form Management",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        With Crab Stash, form creation is a breeze. The application automatically generates forms
        based on categories, streamlining the process of adding and editing fields. This
        user-friendly feature ensures that your team can manage data effortlessly, saving time and
        reducing the learning curve for form-related tasks.
      </>
    ),
  },
  {
    title: "Robust User Role Management",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Crab Stash empowers you to manage user roles seamlessly. From viewers to owners, the
        application provides fine-grained control over permissions. Whether it's restricting access
        to read-only viewing or granting extensive editing capabilities, you have the flexibility to
        tailor user roles to match your warehouse management requirements.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
