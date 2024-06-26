# Use the official Ruby image as a base
FROM ruby:3.3.3-slim-bullseye

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# Set the working directory
WORKDIR /app

# Copy the Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install the gems specified in the Gemfile
RUN bundle install

# Copy the rest of the application code
COPY . .

# Precompile assets (if you have any)
# RUN bundle exec rake assets:precompile

# Expose the port that the Rails server will run on
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
