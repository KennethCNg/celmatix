class NameValidator < ActiveModel::EachValidator
    def validate_each(record, attribute, value)
        name.each_char do |ch|
            if ch.ord == 32
                next
            elsif !((ch.ord >= 97 && ch.ord <= 122) || (ch.ord >= 65 && ch.ord <= 90))
                return record.errors[attribute] << (options[:"#{attribute}"] || "is not an email")
            end
        end
    end
  end