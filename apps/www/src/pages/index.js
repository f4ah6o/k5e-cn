import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'

import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://github.com/f4ah6o/k5e-cn"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  )
}

const FeatureList = [
  {
    title: 'Copy & Paste',
    icon: '📋',
    description:
      'Not a dependency. Components are copied directly into your project, giving you full ownership and control.',
  },
  {
    title: 'kintone Native',
    icon: '🎯',
    description:
      'Built specifically for kintone. Uses official CSS classes and follows platform guidelines perfectly.',
  },
  {
    title: 'TypeScript Ready',
    icon: '📘',
    description:
      'Full TypeScript support with type definitions for kintone APIs and component configurations.',
  },
  {
    title: 'Zero Dependencies',
    icon: '📦',
    description:
      'Self-contained components wrapped in IIFE. No npm packages or build tools required in production.',
  },
  {
    title: 'Production Tested',
    icon: '✅',
    description:
      'Components are tested in real kintone environments with various app configurations and data volumes.',
  },
  {
    title: 'Customizable',
    icon: '🎨',
    description:
      'Since you own the code, customize components to match your exact requirements and branding.',
  },
]

function Feature({ icon, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="feature text--center padding-horiz--md">
        <div className="feature__icon">{icon}</div>
        <h3 className="feature__title">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}

function QuickStart() {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h2 className="text--center">Quick Start</h2>
            <div className={styles.codeExample}>
              <pre>
                <code className="language-bash">
                  {`# Initialize a new project
pnpm dlx k5e-cn@latest init

# Add components
pnpm dlx k5e-cn@latest add table-filter form-validator

# Start development
pnpm dev`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title} - kintone Component Library`}
      description="A shadcn/ui-inspired component library for kintone customization"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickStart />
      </main>
    </Layout>
  )
}
