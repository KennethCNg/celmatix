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
    
  end
end
