class MatchesController < ApplicationController
    def index
        @matches = Match.all
        render json: @matches, response: 200
    end

    #TODO: add player to match
    def create
        @new_match = Match.new()
        render json: self.query_result(@new_match)
    end

    def show
        begin
            @match = Match.find(params[:id])
            render json: @match, status: 200
        rescue ActiveRecord::RecordNotFound
            render json: {error: "Match #{params[:id]} does not exist"}, status: 400
        end
    end

    def update
        begin
            @match = Match.find(params[:id])
            #TODO: Custom validation here?
            if @match.completed != true && @match.update(completed: true)
                render json: @match, status: 200
            else
                render json: {error: "Match is already completed"}, status: 400
            end
        rescue ActiveRecord::RecordNotFound
            render json: {error: "Match #{params[:id]} does not exist"}, status: 400
        end
    end

    def destroy
        begin
            @match = Match.find(params[:id])
            @match.destroy
            render json: {deleted: "Match #{params[:id]}"}, status: 200
        rescue ActiveRecord::RecordNotFound
                render json: {error: "Match #{params[:id]} does not exist"}, status: 400
        end
    end

    private

    def matches_param
        params.require(:matches).permit()
    end
end