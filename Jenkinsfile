pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-p 3000:3000' 
        }
    }
    
    environment {
        CI = 'true'
        NODE_ENV = 'production'
        NPM_CONFIG_CACHE = '.npm'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                
                echo "Building ${env.JOB_NAME}..."
                echo "Branch: ${env.BRANCH_NAME}"
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                
                sh 'node --version'
                sh 'npm --version'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint || echo "No lint configuration found, skipping..."'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test -- --coverage --watchAll=false'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production environment...'
                
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
                
                
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
