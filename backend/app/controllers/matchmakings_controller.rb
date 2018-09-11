class MatchmakingsController < ApplicationController
    def index
        @matchmakings = Matchmaking.all
        render json: @matchmakings
    end

    def create
        begin
            @user = User.find(matchmaking_params[:user_id])
            @match = Match.find(matchmaking_params[:match_id])
            @new_matchmaking = Matchmaking.new(user: @user, match: @match)
            render json: self.query_result(@new_matchmaking)
        rescue ActiveRecord::RecordNotFound => e
            render json: {error: e.message}, status: 400
        end
    end

    def show
        begin
            @matchmaking = Matchmaking.find(params[:id])
            render json: @matchmaking
        rescue ActiveRecord::RecordNotFound => e
            render json: {error: "Matchmaking #{params[:id]} does not exist"}, status: 400
        end
    end

    def destroy
        begin
            @matchmaking = Matchmaking.find(params[:id])
            @matchmaking.destroy
            render json: {deleted: "Matchmaking #{params[:id]}"}, status: 200
        rescue ActiveRecord::RecordNotFound
                render json: {error: "Matchmaking #{params[:id]} does not exist"}, status: 400
        end
    end

    private

    def matchmaking_params
        params.permit(:user_id, :match_id)
    end
end