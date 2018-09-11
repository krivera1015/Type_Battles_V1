class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :wpm, :in_match
    has_many :matchmaking
end
