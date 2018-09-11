class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users
    end

    def create
        @new_user = User.new(name: params[:name])
        render self.query_result(@new_user)
    end

    def show
        begin
            @user = User.find(params[:id])
            render self.query_result(@user)
        rescue ActiveRecord::RecordNotFound
            render json: {error: "User #{params[:id]} does not exist"}, status: 400
        end
    end

    # TODO: YUCK, please refactor!
    def join_game
        begin
            @matches = Match.where("player_count < 4")
            @user = User.find(params[:id])
            if @matches.empty? && @user.in_match != true
                @match = Match.create()
                @match.matchmaking.create(user_id: params[:id])
                @user.toggle_in_match()
                render json: {result: "A new match was created."}
            elsif @user.in_match != true
                @match = @matches.all.first
                @match.matchmaking.create(user_id: params[:id])
                @match.update(player_count: @match.player_count + 1)
                @user.toggle_in_match()
                render json: @match
            else
                render json: {error: "User is already in a match"}, status: 400
            end
        rescue ActiveRecord::RecordNotFound
            render json: {error: "User #{params[:id]} does not exist"}, status: 400
        end
    end 

    def destroy
        begin
            @user = User.find(params[:id])
            render json: {deleted: "User #{params[:id]} was deleted"}, status: 200
        rescue ActiveRecord::RecordNotFound
            render json: {error: "User #{params[:id]} does not exist"}, status: 400
        end
    end

    private

    def user_params
        params.require(:user).permit(:name)
    end
end