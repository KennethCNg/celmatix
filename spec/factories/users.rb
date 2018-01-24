# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  fname      :string           not null
#  lname      :string           not null
#  email      :string           not null
#  age        :string           not null
#  height     :string           not null
#  weight     :integer
#  color      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :user do
    fname { Faker::Name.first_name }
    lname { Faker::Name.last_name }
    email { Faker::Internet.email }
    age { Faker::Number.between(1, 1000) }
    height { Faker::Number.digit.to_s + "'" + Faker::Number.digit.to_s }
    weight { Faker::Number.between(1, 1000) }
    color { Faker::Color.color_name }
  end
end
