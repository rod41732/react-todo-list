TOKEN=$1
shift
MESSAGE="$@"
curl -X POST https://notify-api.line.me/api/notify -H "Authorization: Bearer $TOKEN" -F "message=$MESSAGE"
