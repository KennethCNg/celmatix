# == Schema Information
#
# Table name: users
#
#  id             :integer          not null, primary key
#  fname          :string           not null
#  lname          :string           not null
#  email          :string           not null
#  age            :integer          not null
#  height         :string           not null
#  weight         :integer
#  favorite_color :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'rails_helper'
require 'support/factory_bot'

RSpec.describe User, type: :model do    

  subject(:user) do
    FactoryBot.build(:user,
      fname: "Homer",
      lname: "Simpson",
      email: "MrPlow@gmail.com",
      age: 39,
      height: "6'0",
      weight: 315,
      favorite_color: "pink")
  end
  
  describe 'validations' do 
    it { should validate_uniqueness_of(:email) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:fname) }
    it { should validate_presence_of(:lname) }
    it { should validate_presence_of(:age) }
    it { should validate_presence_of(:height) }
    it { should validate_presence_of(:favorite_color) } 
    it { should validate_numericality_of(:age) }
    it { should validate_numericality_of(:weight) }
    
    # context 'is invalid' do
    #   specify 'when fname has numbers or symbols' do
    #     no_first_name = FactoryBot.build(:user, fname: "B4D")
    #     expect(no_first_name).not_to be_valid
    #   end
    # end

    # context 'is invalid' do
    #   specify 'when lname has numbers or symbols' do
    #     no_first_name = FactoryBot.build(:user, lname: "B4D")
    #     expect(no_first_name).not_to be_valid
    #   end
    # end

    # context 'is invalid' do
    #   specify 'when emails hs has numbers of symbols' do
    #     bad_email = FactoryBot.build(:user, email: "B4D3M41L.com")
    #     expect(bad_email).not_to be_valid
    #   end
    # end

    it { should allow_value("Homer").for(:fname) }
    it { should allow_value("Simpson").for(:fname) }
    it { should allow_value("MrPlow@gmail.com").for(:email) }
  end
end
