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

class User < ApplicationRecord
    VALID_EMAIL_REGEX = /.+@.+\..+/i
    VALID_NAME_REGEX = /\A[^0-9`!@#\$%\^&*+_=]+\z/

    validates :email, presence: true, uniqueness: true
    validates :fname, :lname, :age, :height, :favorite_color, presence: true
    validates_numericality_of :weight, only_integer: true, greater_than_or_equal_to: 0

    # name validation from: https://stackoverflow.com/questions/2629422/rails-validating-full-name
    validates_format_of :fname, :lname, with: VALID_NAME_REGEX, message: 'name cannot contain numbers or symbols'
    validates_format_of :email, with: VALID_EMAIL_REGEX, message: 'must have valid format such as (ex. faker@gmail.com)'
end
