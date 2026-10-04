import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Formik } from "formik";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/appNavigator";
import WrapperView from "../components/wrapperView";
import { useApp } from "../context/AppContext";

type ProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const profileSchema = yup.object({
  name: yup.string().required("Name is required"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(1, "Age must be at least 1")
    .max(17, "Age must be less than 18"),

  height: yup.number().typeError("Height must be a number").notRequired(),

  weight: yup.number().typeError("Weight must be a number").notRequired(),

  allergies: yup.string().required("Please enter allergies or write 'None'"),

  likedFood: yup.string().required("Please enter your child's favourite food"),

  dislikeFood: yup
    .string()
    .required("Please enter disliked food or write 'None'"),
});

export interface Values {
  name: string;
  age: string;
  height?: string;
  weight?: string;
  allergies: string;
  likedFood: string;
  dislikeFood: string;
}

const Profile = () => {
  const { hasProfile, kidProfile, saveProfile } = useApp();

  const initialValues: Values = {
    name: "",
    age: "",
    height: "",
    weight: "",
    allergies: "",
    likedFood: "",
    dislikeFood: "",
  };

  const formInitialValues: Values = kidProfile
    ? {
        name: kidProfile.name,
        age: String(kidProfile.age),
        height: kidProfile?.height ? String(kidProfile.height) : "",
        weight: kidProfile?.weight ? String(kidProfile.weight) : "",
        allergies: kidProfile.allergies,
        likedFood: kidProfile.likedFood,
        dislikeFood: kidProfile.dislikeFood,
      }
    : initialValues;
  const navigation = useNavigation<ProfileNavigationProp>();

  const handleSaveButton = async (values: Values) => {
    try {
      const profile = {
        ...values,
        age: Number(values.age),
        height: values.height ? Number(values.height) : undefined,
        weight: values.weight ? Number(values.weight) : undefined,
      };

      await saveProfile(profile);
      console.log("The saved data is", profile);
      navigation.navigate("HomeScreen");
    } catch {
      console.log("Oops , something wrong happened ");
    }
  };

  return (
    <WrapperView>
      <ScrollView>
        <View className="pt-12 px-6 items-center">
          <Text className="text-3xl font-bold text-blue-950 text-center">
            Let's set up your child's profile
          </Text>

          <View className="items-center mt-3">
            <Text className="text-base text-slate-600 text-center">
              This helps us to create a personalized
            </Text>

            <Text className="text-base text-slate-600 text-center">
              Diet plan just for them !
            </Text>
          </View>
        </View>

        <Formik
          initialValues={formInitialValues}
          validationSchema={profileSchema}
          onSubmit={handleSaveButton}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            isValid,
            isSubmitting,
            dirty,
          }) => (
            <>
              <View className="mt-8 mx-5 px-5 py-6 bg-white/90 rounded-3xl shadow-sm">
                {/* Name */}
                <View>
                  <Text className="text-sm font-bold text-blue-950 mb-2">
                    Name*
                  </Text>

                  <TextInput
                    className="px-4 py-3.5  border border-blue-400 rounded-2xl text-blue-950"
                    placeholder="Enter your child's name"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />
                </View>

                {touched.name && errors.name && (
                  <Text className="text-red-500 mt-1">{errors.name}</Text>
                )}

                {/* Age */}
                <View className="mt-4">
                  <Text className="text-sm font-bold text-blue-950 mb-2">
                    Age*
                  </Text>

                  <TextInput
                    className="px-4 py-3.5  border border-blue-400 rounded-2xl text-blue-950"
                    placeholder="Enter your child's age"
                    value={values.age}
                    onChangeText={handleChange("age")}
                    onBlur={handleBlur("age")}
                    keyboardType="numeric"
                  />
                </View>

                {touched.age && errors.age && (
                  <Text className="text-red-500 mt-1">{errors.age}</Text>
                )}

                {/* Height & Weight */}
                <View className="flex-row gap-4 mt-4">
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-blue-950 mb-2">
                      Height (cm)
                    </Text>

                    <TextInput
                      className="px-4 py-3.5  border border-blue-400 rounded-2xl text-blue-950"
                      placeholder="Height in cm"
                      value={values.height}
                      onChangeText={handleChange("height")}
                      onBlur={handleBlur("height")}
                      keyboardType="numeric"
                    />

                    {touched.height && errors.height && (
                      <Text className="text-red-500 mt-1">{errors.height}</Text>
                    )}
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-bold text-blue-950 mb-2">
                      Weight (kg)
                    </Text>

                    <TextInput
                      className="px-4 py-3.5  border border-blue-400 rounded-2xl text-blue-950"
                      placeholder="Weight in kg"
                      value={values.weight}
                      onChangeText={handleChange("weight")}
                      onBlur={handleBlur("weight")}
                      keyboardType="numeric"
                    />

                    {touched.weight && errors.weight && (
                      <Text className="text-red-500 mt-1">{errors.weight}</Text>
                    )}
                  </View>
                </View>

                {/* Allergies */}
                <View className="mt-4">
                  <Text className="text-sm font-bold mb-2 text-blue-950">
                    Allergies (if any)
                  </Text>

                  <TextInput
                    className="px-4 py-3.5 min-h-20  border border-blue-400 rounded-2xl text-blue-950"
                    placeholder="Add allergies"
                    multiline
                    textAlignVertical="top"
                    value={values.allergies}
                    onChangeText={handleChange("allergies")}
                    onBlur={handleBlur("allergies")}
                  />
                </View>

                {touched.allergies && errors.allergies && (
                  <Text className="text-red-500 mt-1">{errors.allergies}</Text>
                )}

                {/* Favourite Food */}
                <View className="mt-4">
                  <Text className="text-sm font-bold mb-2 text-blue-950">
                    Favourite Food
                  </Text>

                  <TextInput
                    className="px-4 py-3.5 min-h-20  border border-blue-400 rounded-2xl text-blue-950"
                    placeholder="Add Favourite food"
                    multiline
                    textAlignVertical="top"
                    value={values.likedFood}
                    onChangeText={handleChange("likedFood")}
                    onBlur={handleBlur("likedFood")}
                  />
                </View>

                {touched.likedFood && errors.likedFood && (
                  <Text className="text-red-500 mt-1">{errors.likedFood}</Text>
                )}

                {/* Dislike Food */}
                <View className="mt-4">
                  <Text className="text-sm font-bold mb-2 text-blue-950">
                    Dislike food (if any)
                  </Text>

                  <TextInput
                    className="px-4 py-3.5 min-h-20  border border-blue-400 rounded-2xl text-blue-950"
                    placeholder="Add Dislike food"
                    multiline
                    textAlignVertical="top"
                    value={values.dislikeFood}
                    onChangeText={handleChange("dislikeFood")}
                    onBlur={handleBlur("dislikeFood")}
                  />
                </View>

                {touched.dislikeFood && errors.dislikeFood && (
                  <Text className="text-red-500 mt-1">
                    {errors.dislikeFood}
                  </Text>
                )}
              </View>

              {/* Save / Update */}
              <TouchableOpacity
                className={`w-52 py-4 rounded-full self-center mt-6 mb-6 shadow-sm ${
                  !isValid || isSubmitting || !dirty
                    ? "bg-slate-300"
                    : "bg-blue-950"
                }`}
                disabled={!isValid || isSubmitting || !dirty}
                onPress={() => handleSubmit()}
              >
                <Text className="text-white text-center font-bold text-lg">
                  {kidProfile ? "Update Profile" : "Save Profile"}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </WrapperView>
  );
};

export default Profile;
