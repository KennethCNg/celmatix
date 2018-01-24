require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    describe 'POST #create' do
        context "with valid params" do
            it "responds with a 204 status" do
                post :create,  params: { user: { fname: "Homer", 
                                        lname: "Simpson", 
                                        email: "MrPlow@gmail.com", 
                                        age: "46 or older",
                                        height: "6'0",
                                        weight: 315,
                                        color: "Pink" 
                                    } }
                expect(response).to have_http_status(204)
            end
        end
    end

    describe 'POST #verify' do
        context 'with invalid params' do
            it 'validates the presence of fname' do
              post :verify, params: { name: { fname: "", lname: "Simpson" } }
              expect(response).to have_http_status(422)
            end

            it 'validates the presence of lname' do
                post :verify, params: { name: { fname: "Homer", lname: "" } }
                expect(response).to have_http_status(422)
            end

            it 'validates the presence of email' do
                post :verify, params: { email: { email: "" } }
                expect(response).to have_http_status(422)
            end

            it 'validates the presence of age' do
                post :verify, params: { bio: { age: "", height: "6'0" } }
                expect(response).to have_http_status(422)
            end
            it 'validates the presence of height' do
                post :verify, params: { bio: { age: "", height: "6'0" } }
                expect(response).to have_http_status(422)
            end

            it 'validates the presence of color' do
                post :verify, params: { color: { color: "" } }
                expect(response).to have_http_status(422)
            end
        end

        context 'with valid params' do
            it 'validates the presence of fname and lname' do
              post :verify, params: { name: { fname: "Homer", lname: "Simpson" } }
              expect(response).to have_http_status(204)
            end

            it 'validates the presence of email' do
                post :verify, params: { email: { email: "MrPlow@gmail.com" } }
                expect(response).to have_http_status(204)
            end

            it 'validates the presence of age' do
                post :verify, params: { bio: { age: "46 or older", height: "6'0" } }
                expect(response).to have_http_status(204)
            end
            it 'validates the presence of height' do
                post :verify, params: { bio: { age: "46 or older", height: "6'0" } }
                expect(response).to have_http_status(204)
            end

            it 'validates the presence of color' do
                post :verify, params: { color: { color: "Purple" } }
                expect(response).to have_http_status(204)
            end
        end

    end
end