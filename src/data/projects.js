export const projects = [
  {
    id: 'aircraft-maintenance', index: '01', title: 'AI-Powered Aircraft Maintenance Intelligence Platform', accent: 'magenta', command: './run aircraft-maintenance', status: 'BUILT & TESTED',
    technologies: ['Python', 'FastAPI', 'React.js', 'AWS (Amazon Bedrock)'],
    summary: 'A full-stack platform that turns sensor data and maintenance documentation into AI-assisted maintenance recommendations.',
    highlights: [
      'Built and tested a full-stack platform end-to-end, developing RESTful APIs in Python/FastAPI and resolving integration issues between backend services and the React.js frontend.',
      'Designed a data analytics engine to process sensor data and compute statistical metrics (mean, standard deviation, % change) for predictive maintenance insights, validating outputs through structured test cases.',
      'Integrated AWS Bedrock for AI-assisted maintenance recommendations, combining engineering analytics with maintenance documentation to support decision-making.',
    ],
    terminalOutput: [['STATUS', 'BUILT & TESTED'], ['STACK', 'Python | FastAPI | React.js | AWS Bedrock'], ['ANALYTICS', 'mean | std dev | % change'], ['AI', 'Amazon Bedrock recommendations']],
    repoUrl: null, liveUrl: null,
  },
  {
    id: 'rest-api', index: '02', title: 'High-Performance REST API', accent: 'neon', command: './run rest-api', status: 'BENCHMARKED',
    technologies: ['Spring Boot', 'JWT', 'Docker', 'Bucket4j'],
    summary: 'A production-grade Java/Spring Boot REST API built for throughput, with authentication, adaptive rate limiting and containerized deployment.',
    highlights: [
      'Engineered a production-grade REST API in Java/Spring Boot sustaining 750 requests/second at 0% error rate under simulated load, applying OOP design principles for maintainable, testable code.',
      'Implemented adaptive rate limiting (Bucket4j) and JWT-based authentication, performing debugging and root-cause analysis under simulated high-concurrency load.',
      'Containerized services with Docker and documented setup/configuration steps, enabling consistent deployment across dev and production environments.',
    ],
    terminalOutput: [['REQUESTS/SECOND', '750 (under simulated load)'], ['ERROR RATE', '0% (under simulated load)'], ['AUTH', 'JWT'], ['RATE LIMITING', 'BUCKET4J (adaptive)'], ['CONTAINER', 'DOCKER']],
    repoUrl: null, liveUrl: null,
  },
  {
    id: 'shopping-behavior-analysis', index: '03', title: 'Customer Shopping Behavior Analysis', accent: 'cyan', command: 'python analyze.py', status: 'COMPLETE',
    technologies: ['Python', 'Pandas', 'MySQL'],
    summary: 'An analysis of customer shopping data to surface purchasing trends, customer segments and the factors that influence buying behavior.',
    highlights: [
      'Analyzed customer shopping data to identify purchasing trends, customer segments, and factors influencing buying behavior.',
      'Performed data cleaning and preprocessing in Pandas, including missing-value imputation and data-format standardization, to ensure accurate analysis.',
      'Designed and populated MySQL (RDBMS) tables, writing optimized SQL queries for category-wise sales trends, customer segmentation, and revenue analysis.',
    ],
    terminalOutput: [['DATA PROCESSING', 'COMPLETE'], ['DATABASE', 'MYSQL'], ['ANALYTICS', 'PANDAS'], ['STATUS', 'COMPLETE']],
    repoUrl: null, liveUrl: null,
  },
]