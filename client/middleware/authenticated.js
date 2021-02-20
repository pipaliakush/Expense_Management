import Vue from 'vue';

export default function({ redirect }) {

  // If the user is not authenticated
  if (!Vue.$cookies.get('auth')) {
    return redirect("/login");
  }
}
