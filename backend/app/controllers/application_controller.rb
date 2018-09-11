class ApplicationController < ActionController::API

    def query_result(instance)
        if instance.save
            {json: instance, status: 200}
        else
            {json: self.render_errors(instance), status: 400}
        end
    end

    def render_errors(instance)
        errors_hash = {}
        instance.errors.full_messages.each_with_index do |error|
            errors_hash[index] = error
        end
        errors_hash
    end

end
