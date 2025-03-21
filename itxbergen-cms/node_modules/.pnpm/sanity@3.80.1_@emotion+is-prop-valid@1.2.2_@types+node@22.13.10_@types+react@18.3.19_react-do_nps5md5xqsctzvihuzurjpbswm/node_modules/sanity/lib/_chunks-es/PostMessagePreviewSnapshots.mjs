import { memo, useMemo, useRef, useEffect } from "react";
import { Subject, switchMap, combineLatest, NEVER, share, skipWhile, merge, takeUntil, filter, map, debounceTime } from "rxjs";
import { useDocumentPreviewStore, useSchema, getDraftId, getPublishedId } from "sanity";
const PostMessagePreviews = (props) => {
  const {
    comlink,
    refs,
    perspective
  } = props, documentPreviewStore = useDocumentPreviewStore(), schema = useSchema(), refsSubject = useMemo(() => new Subject(), []), previews$ = useMemo(() => refsSubject.asObservable().pipe(switchMap((refs_0) => combineLatest(refs_0.map((ref) => {
    const draftRef = {
      ...ref,
      _id: getDraftId(ref._id)
    }, draft$ = perspective === "published" ? (
      // Don't emit if not displaying drafts
      NEVER
    ) : documentPreviewStore.observeForPreview(draftRef, schema.get(draftRef._type)).pipe(
      // Share to prevent double subscribe in the merge
      share(),
      // Don't emit if no snapshot is returned
      // eslint-disable-next-line max-nested-callbacks
      skipWhile((p) => p.snapshot === null)
    ), publishedRef = {
      ...ref,
      _id: getPublishedId(ref._id)
    }, published$ = documentPreviewStore.observeForPreview(publishedRef, schema.get(publishedRef._type));
    return merge(published$.pipe(takeUntil(draft$)), draft$).pipe(
      // eslint-disable-next-line max-nested-callbacks
      filter((p_0) => !!p_0.snapshot),
      // eslint-disable-next-line max-nested-callbacks
      map((p_1) => {
        const snapshot = p_1.snapshot;
        return {
          _id: getPublishedId(snapshot._id),
          title: snapshot.title,
          subtitle: snapshot.subtitle,
          description: snapshot.description,
          imageUrl: snapshot.imageUrl
        };
      })
    );
  }))), debounceTime(0)), [documentPreviewStore, refsSubject, schema, perspective]), lastSnapshots = useRef([]);
  return useEffect(() => {
    const sub = previews$.subscribe((snapshots) => {
      comlink.post("presentation/preview-snapshots", {
        snapshots
      }), lastSnapshots.current = snapshots;
    });
    return () => {
      sub.unsubscribe();
    };
  }, [comlink, previews$]), useEffect(() => comlink.on("visual-editing/preview-snapshots", () => ({
    snapshots: lastSnapshots.current
  })), [comlink]), useEffect(() => {
    refsSubject.next(refs);
  }, [refs, refsSubject]), null;
};
var PostMessagePreviewSnapshots = memo(PostMessagePreviews);
export {
  PostMessagePreviewSnapshots as default
};
//# sourceMappingURL=PostMessagePreviewSnapshots.mjs.map
