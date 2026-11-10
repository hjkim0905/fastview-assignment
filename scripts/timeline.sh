#!/bin/bash
# Claude Code 훅에서 호출. 프롬프트 제출(prompt)과 응답 종료(stop) 시각을 한 줄씩 남긴다.
# 사용: timeline.sh prompt|stop  (훅 JSON은 stdin으로 들어온다)
kind="$1"
input=$(cat)
dir="${CLAUDE_PROJECT_DIR:-$(pwd)}/logs"
mkdir -p "$dir"
ts=$(date '+%Y-%m-%d %H:%M:%S')
sid=$(printf "%s" "$input" | jq -r '.session_id // "-"' | cut -c1-8)
text=""
if [ "$kind" = "prompt" ]; then
  text=$(printf "%s" "$input" | jq -r '.prompt // ""' | tr '\n\t' '  ' | cut -c1-80)
fi
printf '%s\t%s\t%s\t%s\n' "$ts" "$sid" "$kind" "$text" >> "$dir/timeline.tsv"
exit 0
