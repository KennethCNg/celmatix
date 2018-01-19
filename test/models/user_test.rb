# == Schema Information
#
# Table name: users
#
#  id             :integer          not null, primary key
#  fname          :string           not null
#  lname          :string           not null
#  email          :string           not null
#  age            :integer          not null
#  height         :integer          not null
#  weight         :integer
#  favorite_color :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
