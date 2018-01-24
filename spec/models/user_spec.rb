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

require 'rails_helper'
require 'support/factory_bot'

RSpec.describe User, type: :model do    

  subject(:user) { FactoryBot.build(:user) }
  
  describe 'validations' do 
    it { should validate_presence_of(:fname) }

    it { should validate_presence_of(:lname) }

    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
    it 'should validate color can have no number' do
      expect(FactoryBot.build(:user, color: "B4D1NPuT")).not_to be_valid
      expect(FactoryBot.build(:user, color: 123)).not_to be_valid
    end
    it 'should validate color has no symbols' do
      expect(FactoryBot.build(:user, color: "B,DInP!T")).not_to be_valid
    end

    it { should validate_presence_of(:age) }

    it { should validate_presence_of(:height) }

    it { should validate_numericality_of(:weight) }
    it { should allow_value("", nil).for(:weight) }

    it { should validate_presence_of(:color) } 
  end
end
