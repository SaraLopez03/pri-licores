pipeline {
  agent any

  tools {
    nodejs 'node20'
  }

  environment {
    NODE_VERSION = '20'
    AWS_REGION = 'us-west-2'
  }

  options {
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        sh '''
          node -v
          npm -v
          npm ci
          export NODE_OPTIONS="--max-old-space-size=2048"
          npm run build
        '''
      }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
      environment {
        FRONTEND_BUCKET = credentials('prilicores-frontend-bucket')
        CLOUDFRONT_DISTRIBUTION_ID = credentials('prilicores-cloudfront-distribution-id')
      }
      steps {
        sh 'npm run build'
        sh 'aws s3 sync build/ s3://${FRONTEND_BUCKET}/ --delete'
        sh 'aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"'
      }
    }
  }
}
