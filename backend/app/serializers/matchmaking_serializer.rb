class MatchmakingSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :match_id
    belongs_to :user
end
